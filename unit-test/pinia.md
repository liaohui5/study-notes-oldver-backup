## 功能模块拆分

- types.d.ts 各个文件需要的 ts 类型注解
- services/index.ts 服务模块导出总出口
- services/user.ts 请求服务端用户 API 相关方法
- store/user.ts 实际业务 pinia store 文件
- store/user.spec.ts 实际业务 store 的测试文件

```typescript
// types.d.ts 其他文件需要的数据类型约束
// 登录表单数据结构
interface ILoginForm {
  email: string;
  password: string;
}

// 更新用户密码
interface IUpdatePasswordForm {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

// 用户对象
interface IUserDto {
  id: number;
  username: string;
  email: string;
  avatar: string;
  status: number;
  created_at: string;
  token?: string;
  permissions?: IPermisssionDto[];
  roles?: IRoleDto[];
}

// 创建用户信息
type ICreateUserForm = Pick<IUserDto, 'username' | 'email' | 'password'> & {
  confirm: string;
  avatar?: string;
};

// 修改用户信息
type IUpdateUserForm = Partial<IUserDto>;

// 角色对象
interface IRoleDto {
  id: 1;
  role_name: '超级管理员';
  role_desc: '拥有所有权限';
  permissions?: IPermisssionDto[];
}

// 权限对象
interface IPermisssionDto {
  id: number;
  desc: string;
  type: number;
  method: string | null;
  icon: string;
  path: string;
  status: number;
  pid: number;
}

// 带有分页信息的响应数据
interface PaginateResponse<T> {
  count: number;
  rows: T[];
}

// 分页参数
interface IPagination {
  page: number;
  size: number;
}

// 搜索参数
interface ISearchParams extends IPagination {
  type?: number | string;
  content?: string;
}

// 获取用户接口的响应数据
type IGetUsersResponse = PaginateResponse<IUserDto>;
```

```typescript
// services/index.ts services导出总出口, 这样的好处是在导入时, 不需要再 @/services/xxx 可以直接 @services
export * as userService from './user';
```

```typescript
// services/user.ts
export function login(data: ILoginForm): Promise<IUserDto> {
  return http.post('/api/auth/login', data);
}

export function updatePassword(data: IUpdatePasswordForm): Promise<void> {
  return http.patch('/api/users/update_password', data);
}

export function getUsers(params: ISearchQuery): Promise<IGetUsersResponse> {
  return http.get('/api/users', { params });
}

export function createUser(data: ICreateUserForm): Promise<IUserDto> {
  return http.post('/api/users', data);
}

export function updateUser(id: number, data: IUpdateUserForm): Promise<void> {
  return http.patch(`/api/users/${id}`, data);
}
```

```typescript
// store/user.ts 用户相关数据
import { removeToken, saveToken } from '@/utils/token';
import { defineStore } from 'pinia';
import { userService } from '@/services';
import { useLocalStorage } from '@vueuse/core';
import { reactive, watch, nextTick } from 'vue';

export const useUserStore = defineStore('user', () => {
  const defaultUser: IUserDto = {
    id: 0,
    username: '',
    email: '',
    avatar: '',
    status: 0,
    created_at: '',
    token: '',
    permissions: [],
  };

  // 登录和注销功能
  const authUser = useLocalStorage('pinia/authUser', defaultUser);
  function setAuthedUser(userInfo: IUserDto): void {
    authUser.value = userInfo;
  }
  function getAuthedUser() {
    return authUser.value;
  }
  async function login(loginForm: ILoginForm) {
    const authedUser = await userService.login(loginForm);
    setAuthedUser(authedUser);
    saveToken(authedUser.token!);
  }
  function logout() {
    setAuthedUser(defaultUser);
    removeToken();
  }

  // 更新用户密码功能
  async function updateUserPassword(data: IUpdatePasswordForm) {
    await userService.updatePassword(data);
    removeToken();
  }

  // 查询用户列表
  const users = reactive<IGetUsersResponse>({
    count: 0,
    rows: [],
  });
  const defaultSearchQuery: ISearchQuery = {
    page: 1,
    size: 10,
    type: '',
    content: '',
  };
  const searchParams = reactive<ISearchQuery>(defaultSearchQuery);
  async function getUsers() {
    const res = await userService.getUsers(searchParams);
    users.count = res.count;
    users.rows = res.rows;
  }
  watch(
    () => [searchParams.page, searchParams.size],
    async () => await getUsers(),
  );

  // 创建用户信息
  const createLayerData = reactive({
    visible: false,
  });
  const createFormModel = reactive<ICreateUserForm>({
    // 需要提交到服务端的表单数据
    username: '',
    email: '',
    password: '',
    confirm: '',
  });
  async function createUserInfo(user: ICreateUserForm) {
    await userService.createUser(user);
    await nextTick(getUsers);
  }

  // 修改用户信息
  async function updateUserInfo(id: number, user: IUpdateUserForm) {
    await userService.updateUser(id, user);
    await nextTick(getUsers);
  }
  const updateLayerData = reactive<{ visible: boolean; row?: IUserDto }>({
    visible: false,
    row: undefined,
  });
  const updateFormModel = reactive<IUpdateUserForm>({
    // 需要提交到服务端的表单数据
    id: 0,
    username: '',
    email: '',
    avatar: '',
  });
  watch(
    () => updateLayerData.row as IUserDto,
    (value: IUserDto) => {
      if (!value) return;
      updateFormModel.id = value.id;
      updateFormModel.username = value.username;
      updateFormModel.email = value.email;
      updateFormModel.avatar = value.avatar;
    },
  );

  return {
    login,
    logout,
    authUser,
    getAuthedUser,
    updateUserPassword,
    getUsers,
    searchParams,
    users,
    createLayerData,
    createFormModel,
    createUserInfo,
    updateLayerData,
    updateFormModel,
    updateUserInfo,
  };
});
```

## 测试 store 业务逻辑

```typescript
// store/user.spec.ts 业务逻辑单元测试
import { userService } from '@/services';
import { useUserStore } from '@/store/user';
import { hasToken, removeToken, saveToken } from '@/utils/token';
import { setActivePinia, createPinia } from 'pinia';

vi.mock('@/services', () => {
  return {
    userService: {
      login: () => {
        return {
          id: 1,
          username: 'admin',
          email: 'admin@qq.com',
          avatar: 'http://xxx.com/1.jpg',
          status: 0,
          created_at: '2020-12-18T07:08:56.000Z',
          token: 'token-string',
          permissions: [],
        };
      },
      updatePassword: vi.fn(),
      createUser: vi.fn(),
      updateUser: vi.fn(),
      getUsers: () => {
        return {
          count: 10,
          rows: [
            {
              id: 1,
              email: 'test@qq.com',
            },
          ],
        };
      },
    },
  };
});

describe('user store', () => {
  let store: any;
  beforeEach(() => {
    removeToken();
    setActivePinia(createPinia());
    store = useUserStore();
  });

  describe('login/logout', () => {
    it('authed user info should have email, username and token fields', () => {
      const authUserInfo = store.getAuthedUser();
      expect(authUserInfo).toHaveProperty('username');
      expect(authUserInfo).toHaveProperty('email');
      expect(authUserInfo).toHaveProperty('token');
    });

    it('should be set authed user info after login', async () => {
      await store.login({} as ILoginForm);
      const authUserInfo = store.getAuthedUser();
      expect(authUserInfo.username).toBe('admin');
    });

    it('should be saved token after login', async () => {
      await store.login({} as ILoginForm);
      expect(hasToken()).toBe(true);
    });
  });

  describe('update user password', () => {
    it('should be delete token after update user password', async () => {
      saveToken('token-string'); // mock logined status
      expect(hasToken()).toBe(true);

      await store.updateUserPassword({} as IUpdatePasswordForm);
      expect(hasToken()).toBe(false);
    });
  });

  describe('search user list', () => {
    it('should be have list data and pagination information', async () => {
      await store.getUsers();
      expect(Array.isArray(store.users.rows)).toBe(true);
      expect(store.users.count).toBeTypeOf('number');
    });

    it('should be get users list align when search params page or size field changed', async () => {
      function updatePatinationParams(isPage = false): Promise<void> {
        if (isPage) {
          store.searchParams.page += 1;
        } else {
          store.searchParams.size += 1;
        }
        return Promise.resolve();
        // 因为 watch 触发 reactive 的依赖是异步触发的, 所以应该 await
      }

      vi.spyOn(userService, 'getUsers');
      await updatePatinationParams();
      expect(userService.getUsers).toBeCalled();

      await updatePatinationParams(true);
      expect(userService.getUsers).toBeCalled();
    });
  });

  describe('create user info', () => {
    it('should be get users list align when created new user', async () => {
      vi.spyOn(userService, 'getUsers');
      await store.createUserInfo();
      expect(userService.getUsers).toBeCalled();
    });
  });

  describe('update user info', () => {
    it('should be get users list align when updated user info', async () => {
      vi.spyOn(userService, 'getUsers');
      await store.updateUserInfo();
      expect(userService.getUsers).toBeCalled();
    });
  });
});
```
