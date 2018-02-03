import React from "react";
import {Form,Input} from "antd";
const
    FormItem = Form.Item;

class FormUtils {
//     formUtils = new FormUtils(this.props.form);
//     const BaseForm = Form.create()(LoginForm);
//
//     class Login extends React.Component {
//     render() {
//         return <BaseForm {...this.props}/>
//     }
// };
// export default Login

    static  formItemLayout(multiple=0){
        const offset = multiple*2;
        return {
            labelCol: {
                xs: { span: 6+offset },
                sm: { span: 3+offset  },
            },
            wrapperCol: {
                xs: { span: 24+offset},
                sm: { span: 16+offset},
            },
        }
    }
    constructor(form) {
        this.form = form;

        // 记得规则上加上 required: true
        this.hasErrors = (fields) => {
            let fieldsError = this.getFieldsError(fields);
            return Object.keys(fieldsError || {}).some(field => fieldsError[field]);
        }
        this.help = (name) => {
            const
                {getFieldError, isFieldTouched} = this.form,
                isTouched = isFieldTouched(name),
                error = getFieldError(name);

            // 后面的  || '' 必须加不然不正常
            return {
                hasFeedback: true,
                validateStatus: (isTouched && (error ? 'error' : 'success')) || '',
                help: (isTouched && error) || ''
            }
        }

        // formUtils.getFieldDecoratorEx({field:"password",rules: validator.password,label:"密码"})( <Input type="password"/>)

        // class LoginForm extends BaseComponent {
        //     formUtils = new FormUtils(this.props.form);
        // }
//         const BaseForm = Form.create()(LoginForm);
//
//         class Login extends React.Component {
//             render() {
//                 return <BaseForm {...this.props}/>
//             }
//         };
//         export default Login
        this.getFieldDecoratorEx = ({field,rules=[],label,formItemParams={}})=>{
            return  (input)=>{
                return <FormItem label={label}
                {...formItemParams}
                {...this.help(field)}
            >
                {
                    this.getFieldDecorator(field, {rules: rules})(input)
                }
            </FormItem>
            }
        }

        Object.entries(this.form).forEach((item) => {
            let
                key = item[0],
            value = item[1];

        if (this.form.hasOwnProperty(key) && !(key in this)) {
            this[key] = value;
        }
    })
    }


}

export default FormUtils;