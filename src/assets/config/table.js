/**
 * 按钮对象
 *
 * name 提示
 * icon 按钮的icon class
 * event 事件
 * eventType 事件传递方式 emit 值就是传递方法， func就是直接组件内置的方法
 * showType 显示icon
 * power 权限
 * show 显示条件 (item) => true
 * sortFilterType: list 筛选  sort 排序  input 模糊查询
 * contentType： 数据转换
 */
// import moment from 'moment'
const EDIT_BTN = {
    name: '修改',
    icon: 'el-icon-edit-outline',
    img: '',
    event: 'handleEdit',
    eventType: 'emit',
    showType: 'icon',
    power: 'Edit'
}

const DEL_BTN = {
    name: '删除',
    icon: 'el-icon-delete',
    img: '',
    event: 'handleDelete',
    eventType: 'func',
    showType: 'icon',
    power: 'Delete'
}

/**
 * 需要用到组件的模块都需要在此声明
 * @type {string[]}
 */
export const modules = [
    'brand/project'
]

/**
 * 需要用到组件的模块都需要在此声明字段
 * headers： 表头格式集合
 */
export const customHeaderLabels = {
    'brand/project': {
        moreBtn: [
            DEL_BTN,
            EDIT_BTN
        ],
        headers: [
            {
                name: '收件信息',
                prop: 'date',            
                minWidth: '10%',
                sortFilterType: 'sort'
            },
            {
                name: '快件信息',
                prop: 'name',
                minWidth: '10%',
                sortFilterType: 'list'
            },
            {
                name: '货架',
                prop: 'goods',
                minWidth: '10%',
                sortFilterType:'input'
            },
            {
                name: '转态',
                prop: 'mailorder',
                contentType: 'istrans',
                minWidth: '10%',
                render (item) {
                  return item.mailorder === '广东邮政' ? '成功' : '失败'
                }
            }
        ],
        power: {
            Authority: 22,
            Edit: 'project_update',
            Delete: 'project_delete',
            AddData: 22
        }
    }
}
