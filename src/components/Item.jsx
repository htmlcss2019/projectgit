import React, { Component } from 'react'

export default class Item extends Component {
    constructor() {
        super();
        this.state={
            inEdit:false
        }
        this.myInput=React.createRef();
    }
    //更改Item组件自身状态值this.state.inEdit
    changeInEdit=()=>{
        let {todo} = this.props;
                                    //this.state状态更新后，执行的匿名回调函数
        this.setState({inEdit:true},()=>{
           this.myInput.current.value=todo.title;//文本框显示todo.title
            this.myInput.current.focus();//原生 js模拟触发
        })
    }
  render() {
      let {todo,delTodo,changeHasCompleted,editTodo}=this.props;
      let {inEdit} = this.state;
      let completed=todo.hasCompleted?"completed":"";
      let classes=inEdit?completed+" editing":completed;
    return (
       <li className={classes}>
        <div className="view">
            <input type="checkbox" className="toggle"
             onChange={()=>changeHasCompleted(todo)}
                   checked={todo.hasCompleted}
            />
            <label onDoubleClick={this.changeInEdit}>{todo.title}</label>
            <button className="destroy"
             onClick={()=>delTodo(todo)}
            ></button>
        </div>
        <input type="text" className="edit" ref={this.myInput}
               //如何在react进行事件解绑
           onBlur={inEdit?()=>{
               console.log("onBlur");
               //已经把文本框里面的字符串存储到当前todo.title中了
                  todo.title=this.myInput.current.value.trim();
               editTodo(todo);
               this.setState({inEdit:false});
             }:null
           }
               onKeyUp={event=>{
                   if(event.key==="Enter"){
                       console.log("Enter")
                   todo.title=this.myInput.current.value.trim();
                   editTodo(todo);
                   this.setState({inEdit:false});
                 }
                   if(event.key==="Escape"){
                       console.log("ESC");
                       this.setState({inEdit:false});
                   }
                 }
               }
        />
       </li>
    )
  }
}
