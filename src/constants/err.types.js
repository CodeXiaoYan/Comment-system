//注册
const USRT_OR_PASSWORD_IS_REQUIRED = 'name_or_password_is_required' //用户名密码为空
const EMAIL_IS_EMPTY = 'email_is_empty' // 邮箱为空
const USER_ALREADY_EXISTS = 'user_already_exists' // 用户名已注册
const EMAIL_TO_REPEAT = "email_to_repeat" // 邮箱已注册
const PASSWORD_STRENGTH =  'password_strength'// 密码强度不够
const NOT_CORRECT_EMAI = "not_correct_emai" //输入的不是正确邮箱
//登录
const USER_DOES_NOT_EXISTS = 'user_does_not_exist' //用户不存在
const PASSWORD_MISTAKE = 'password_mistake' // 密码错误
const NOT_REGISTERED_EMAIL = "not_registered_email" // 该邮箱不是注册邮箱
const UNAUTHORIZED = 'unauthorized' //未授权
const HAVE_NO_RIGHT = "have_no_right" //不具备权限

module.exports = {
    USRT_OR_PASSWORD_IS_REQUIRED,
    EMAIL_IS_EMPTY,
    EMAIL_TO_REPEAT,
    USER_ALREADY_EXISTS,
    PASSWORD_STRENGTH,
    USER_DOES_NOT_EXISTS,
    PASSWORD_MISTAKE,
    UNAUTHORIZED,
    NOT_REGISTERED_EMAIL,
    NOT_CORRECT_EMAI,
    HAVE_NO_RIGHT
}