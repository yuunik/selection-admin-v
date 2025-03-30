<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type {
  CheckboxProps,
  CheckboxValueType,
  UploadProps,
} from 'element-plus'
import Cookies from 'js-cookie'

import type { PageParamsType } from '@/types'
import {
  addUserApi,
  assignRoleApi,
  deleteUserApi,
  getAllRoleApi,
  pageUserListApi,
  updateUserApi,
} from '@/apis/acl'
import type { SysRoleType, SysUserSearchParams } from '@/types/acl'
import type { UserType } from '@/types/login'

// 用户数据列表
const userTableData = ref<UserType[]>([])

// 页面分页参数
const pageParams = reactive<PageParamsType>({
  pageNum: 1,
  pageSize: 5,
  pageTotal: 0,
})

// 处理分页器变化
const handlePageChange = (pageNum: number, pageSize: number) => {
  pageParams.pageNum = pageNum
  pageParams.pageSize = pageSize
  // 请求用户数据列表
  getUserList(pageNum)
}

// 分页查询用户列表的请求参数
const queryParam = reactive<SysUserSearchParams>({
  keyword: '',
  createTimeBegin: '',
  createTimeEnd: '',
})

// 获取用户数据列表
const getUserList = async (pageNum = 1) => {
  // 默认请求第一页数据
  pageParams.pageNum = pageNum
  const {
    data: {
      code,
      data: { list, total },
    },
  } = await pageUserListApi(pageParams.pageNum, pageParams.pageSize, queryParam)
  if (code === 200) {
    // 请求成功
    userTableData.value = list
    pageParams.pageTotal = total
  }
}

// 组件挂载完成后，请求用户数据列表
getUserList()

// 创建时间
const createTime = computed({
  get: () => [queryParam.createTimeBegin, queryParam.createTimeEnd],
  set: (val) => {
    queryParam.createTimeBegin = val[0]
    queryParam.createTimeEnd = val[1]
  },
})

// 条件搜索
const handlePageUserBySearch = () => getUserList()

// 重置条件搜索
const handleReset = () => {
  // 重置表单
  queryParam.keyword = ''
  queryParam.createTimeBegin = ''
  queryParam.createTimeEnd = ''
  // 重新渲染
  getUserList()
}

// 弹窗状态
const userDialogVisible = ref(false)

// 打开新增用户弹窗
const openAddUserDialog = () => {
  // 重置表单
  Object.assign(userInfo, {
    id: '',
    userName: '',
    name: '',
    phone: '',
    password: '',
    description: '',
  } as UserType)
  // 重置头像
  avatarUrl.value = ''
  // 打开弹窗
  userDialogVisible.value = true
}

// 上传文件前
const beforeAvatarUpload: UploadProps['beforeUpload'] = (file) => {
  // 限制文件格式
  if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
    ElMessage.error('请上传 jpg 或 png 格式的图片')
    return false
  }
  // 限制文件大小
  const fileSize = file.size / 1024 / 1024
  if (fileSize > 2) {
    ElMessage.error('请上传小于 2M 的图片')
    return false
  }
  return true
}

// 上传文件成功
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  // 上传成功，更新头像地址
  avatarUrl.value = response.data
}

// 头像地址
const avatarUrl = ref('')

// 用户数据
const userInfo = reactive<UserType>({} as UserType)

// 用户信息表单提交
const handleSubmit = async () => {
  if (userInfo.id) {
    // 编辑
    handleEditUser()
  } else {
    // 新增
    handleAddUser()
  }
}

// 新增用户
const handleAddUser = async () => {
  // 合并头像字段
  Object.assign(userInfo, { avatar: avatarUrl.value })
  const {
    data: { code },
  } = await addUserApi(userInfo)
  if (code === 200) {
    // 新增成功
    ElMessage.success('新增成功')
    // 关闭弹窗
    userDialogVisible.value = false
    // 刷新用户列表
    getUserList()
  }
}

// 打开编辑用户弹窗
const openEditUserDialog = (row: UserType) => {
  // 回显数据
  Object.assign(userInfo, row)
  // 回显头像
  avatarUrl.value = row.avatar
  // 打开弹窗
  userDialogVisible.value = true
}

// 编辑用户
const handleEditUser = async () => {
  const {
    data: { code },
  } = await updateUserApi(userInfo)
  if (code === 200) {
    // 编辑成功
    ElMessage.success('编辑成功')
    // 关闭弹窗
    userDialogVisible.value = false
    // 刷新用户列表
    getUserList()
  }
}

// 分配角色弹窗状态
const assignRoleDialogVisible = ref(false)

// 角色列表
const roleList = ref<SysRoleType[]>([])
// 所选择的角色id列表
const selectedRoleIdList = ref<number[]>([])
// 角色选择变化
const handleCheckedRoleChange = (val: CheckboxValueType[]) =>
  (selectedRoleIdList.value = val as number[])

// 全选
const checkAll = computed({
  get: () => selectedRoleIdList.value.length === roleList.value.length,
  set: (val) => {
    if (val) {
      selectedRoleIdList.value = roleList.value.map((role) => role.id as number)
    } else {
      selectedRoleIdList.value = []
    }
  },
})

// 全选状态
const indeterminate = computed(
  () =>
    selectedRoleIdList.value.length > 0 &&
    selectedRoleIdList.value.length < roleList.value.length,
)

// 打开分配角色弹窗
const openAssignRoleDialog = (row: UserType) => {
  // 回显数据
  Object.assign(userInfo, row)
  // 请求角色列表及已分配角色
  getRoleList(userInfo.id)
  // 打开弹窗
  assignRoleDialogVisible.value = true
}

// 请求角色列表及已分配角色
const getRoleList = async (userId: number) => {
  const {
    data: {
      code,
      data: { sysRoleList, userRoleIdList },
    },
  } = await getAllRoleApi(userId)
  if (code === 200) {
    // 请求成功
    // 回显角色列表及已分配角色
    roleList.value = sysRoleList
    selectedRoleIdList.value = userRoleIdList
  }
}

// 为用户分配角色
const handleAssignRole = async () => {
  const {
    data: { code },
  } = await assignRoleApi({
    userId: userInfo.id,
    roleIdList: selectedRoleIdList.value,
  })
  if (code === 200) {
    // 分配角色成功
    ElMessage.success('分配角色成功')
    // 关闭弹窗
    assignRoleDialogVisible.value = false // 关闭弹窗
    // 刷新用户列表
    getUserList() // 刷新用户列表
  }
}

// 删除用户
const handleDeleteUser = async (id: number) => {
  try {
    await ElMessageBox.confirm('确认删除该用户？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    // 确认删除
    const {
      data: { code },
    } = await deleteUserApi(id)
    if (code === 200) {
      // 删除成功
      ElMessage.success('删除成功')
      // 刷新用户列表
      getUserList()
    }
  } catch (error) {
    // 错误提示
    ElMessage.error('删除失败')
  }
}
</script>

<template>
  <div>
    <!-- 操作区 -->
    <div class="common-style" mb20>
      <el-form inline relative>
        <el-form-item label="用户名" class="mb0!">
          <el-input placeholder="请输入用户名" v-model="queryParam.keyword" />
        </el-form-item>
        <el-form-item label="创建时间" class="mb0!">
          <el-date-picker
            type="daterange"
            start-placeholder="起始日期"
            end-placeholder="结束日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            v-model="createTime"
          />
        </el-form-item>
        <el-form-item absolute right-0 top-0 class="mb0!">
          <el-button
            type="primary"
            icon="Search"
            @click="handlePageUserBySearch"
          >
            搜索
          </el-button>
          <el-button type="default" icon="Refresh" @click="handleReset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据区 -->
    <div class="common-style pb-50!" relative>
      <!-- 新增按钮 -->
      <el-button type="primary" icon="Plus" mb12 @click="openAddUserDialog">
        新增
      </el-button>
      <!-- 数据表格 -->
      <el-table :data="userTableData" border stripe style="width: 100%">
        <el-table-column prop="id" label="id" width="80" align="center" />
        <el-table-column prop="userName" label="用户名" align="center" />
        <el-table-column prop="name" label="姓名" align="center" />
        <el-table-column prop="phone" label="手机号" align="center" />
        <el-table-column prop="description" label="简介" align="center" />
        <el-table-column prop="status" label="状态" align="center" width="100">
          <template #default="{ row }">
            <el-tag
              :type="row.status === 1 ? 'success' : 'danger'"
              size="small"
            >
              {{ row.status === 1 ? '正常' : '停用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-button type="warning" link @click="openAssignRoleDialog(row)">
              分配角色
            </el-button>
            <el-button type="primary" link @click="openEditUserDialog(row)">
              编辑
            </el-button>
            <el-button type="danger" link @click="handleDeleteUser(row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <Pagination
        :queryParams="pageParams"
        :handlePageChange="handlePageChange"
      />
    </div>
    <!-- 弹窗区 -->
    <el-dialog
      v-model="userDialogVisible"
      :title="userInfo.id ? '编辑用户' : '新增用户'"
      align-center
      width="520"
    >
      <el-form label-width="80px">
        <el-form-item label="用户名">
          <el-input
            v-model="userInfo.userName"
            placeholder="请输入用户名"
            clearable
          />
        </el-form-item>
        <el-form-item label="密码" v-if="!userInfo.id">
          <el-input
            v-model="userInfo.password"
            type="password"
            placeholder="请输入密码"
            show-password
            clearable
          />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input
            v-model="userInfo.name"
            placeholder="请输入姓名"
            clearable
          />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input
            v-model="userInfo.phone"
            placeholder="请输入手机号"
            clearable
          />
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8501/admin/system/file/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :headers="{ Authorization: `Bearer ${Cookies.get('token')}` }"
          >
            <el-avatar
              v-if="avatarUrl"
              size="large"
              :src="avatarUrl"
              class="avatar"
              shape="square"
            />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="简介">
          <el-input
            v-model="userInfo.description"
            type="textarea"
            placeholder="请输入简介"
            clearable
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="default" @click="userDialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </template>
    </el-dialog>
    <!-- 分配角色弹窗 -->
    <el-dialog
      v-model="assignRoleDialogVisible"
      title="分配角色"
      align-center
      width="520"
    >
      <el-form label-width="80px">
        <el-form-item label="用户名">
          <el-input :value="userInfo.userName" disabled />
        </el-form-item>
        <el-form-item label="角色">
          <el-checkbox-group
            v-model="selectedRoleIdList"
            @change="handleCheckedRoleChange"
          >
            <el-checkbox
              v-for="role in roleList"
              :key="role.id"
              :label="role.roleName"
              :value="role.id"
            />
          </el-checkbox-group>
          <!-- 分割线 -->
          <el-divider />
          <!-- 全选 -->
          <el-checkbox v-model="checkAll" :indeterminate="indeterminate">
            全选
          </el-checkbox>
        </el-form-item>
      </el-form>
      <!-- 按钮区 -->
      <template #footer>
        <el-button type="default" @click="assignRoleDialogVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="handleAssignRole"
          :disabled="selectedRoleIdList.length === 0"
        >
          确认
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss">
.common-style {
  @apply p20 shadow-default rounded-4;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
