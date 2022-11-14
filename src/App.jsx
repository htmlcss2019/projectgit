import React, { Component } from 'react'
import Footer from './components/Footer'
import Item from './components/Item'
import './css/index.css'
export default class App extends Component {
    constructor() {
        super();
        this.state={
            todoDatas:[],//存储所有todo的数组
            todoNum:0,//所有未完成todo条数 todo.hasCompleted false
            view:"all", // 过滤todo标识
            flag:false
        }
    }
    //功能模块1：添加todo
    addTodo=(event)=>{
        if(event.key!=="Enter") return;
        if(event.target.value.trim()==="") return;
        console.log("addTodo被调用了");
        let { todoDatas,todoNum } = this.state;
        //创建todo
        let todo={};
        todo.id=Date.now();
        todo.title=event.target.value.trim();
        todo.hasCompleted=false;
        todoDatas.push(todo);
        todoNum++;
        // this.setState({todoDatas:todoDatas});
        // 简写：
        this.setState({todoDatas,todoNum});
        event.target.value="";
    }
    //删除指定todo
    delTodo=(todo)=>{
        let {todoDatas,todoNum}=this.state;
        todoDatas=todoDatas.filter(value=>{
            if(value.id==todo.id){
                if(!todo.hasCompleted){
                    todoNum--;
                }
                return false;
            }
            return true;
        })
        this.setState({todoDatas,todoNum});
    }
    //改变todo状态 已完成/未完成todo.hasCompleted->todo->todoDatas
    changeHasCompleted=(todo)=>{
        let {todoDatas,todoNum}=this.state;
        todoDatas=todoDatas.map(value=>{
            if(value.id===todo.id){
                value.hasCompleted=!todo.hasCompleted;
                if(value.hasCompleted){
                    todoNum--;
                }else{
                    todoNum++
                }
            }

            return value;
        })
        this.setState({todoDatas,todoNum});

    }
    //编辑todo
    editTodo=(todo)=>{
        let {todoDatas} = this.state;
        todoDatas=todoDatas.map(value=>{
            if(value.id===todo.id){
                value.title=todo.title;
            }
            return value;
        })
        this.setState({todoDatas});
    }
    //过滤todo
    changeView=(view)=>{
        this.setState({view});
    }
    //删除所有已完成todo  todo.hasCompleted true
    clearHasCompleted=()=>{
        let {todoDatas}=this.state;
        todoDatas=todoDatas.filter(value=>{
            if(value.hasCompleted){
                return false;
            }
            return true;
        })
        this.setState({todoDatas})
    }
    //全选和全不选
    selectAllTodo=()=>{
        let {todoDatas,todoNum,flag}=this.state;
        flag=!flag;
        if(flag){
            todoDatas=todoDatas.map(value=>{
                value.hasCompleted=true;
                return value;
            })
            todoNum=0;
        }else{
            todoDatas=todoDatas.map(value=>{
                value.hasCompleted=false;
                return value;
            })
            todoNum=todoDatas.length;
        }
        this.setState({todoDatas,todoNum,flag});
    }
  render() {
        let {todoDatas,todoNum,view,flag}=this.state;
        let {delTodo,changeHasCompleted,editTodo,changeView,clearHasCompleted,selectAllTodo} = this;
        let filterTodoDatas=todoDatas.filter(value=>{
            switch (view){
                case 'all':
                    return true;
                case 'active':
                    return !value.hasCompleted;
                case 'completed':
                    return value.hasCompleted;
                default:
                    return true;
            }
        })
        let items=filterTodoDatas.map(todo=>{
            return (
                <Item key={todo.id} todo={todo}
                    delTodo={delTodo}
                      changeHasCompleted={changeHasCompleted}
                      editTodo={editTodo}
                />
            )
        })
    return (
          <section className="todoapp">
            <header className="header">
              <h1>Todos</h1>
                <input type="text" className="new-todo" placeholder="What need to be done?"
                     onKeyUp={this.addTodo}
                />
            </header>
            <section className="main">
                 <input type="checkbox" className="toggle-all" id="toggle-all"
                   onChange={selectAllTodo}
                        checked={flag}
                 />
                 <label htmlFor="toggle-all"></label>
                 <ul className="todo-list">
                     {
                         items
                     }
                     {/*[*/}
                     {/*  <Item key={11212} todo={#1234}/>*/}
                     {/*  <Item key={22222} todo={#2223}/>*/}
                     {/*  <Item key={33333} todo={#44445}/>*/}
                     {/*]*/}
                 </ul>
            </section>
            <Footer todoNum={todoNum}
                    changeView={changeView}
                    view={view}
                    clearHasCompleted={clearHasCompleted}
            />
         <p>我的作业本</p>
          </section>
    )
  }
}
