import React, {Fragment, Component, createRef} from "react";
import Todo from "./../../components/todo/Todo.js";
import TodoFooter from "./../../components/todoFooter/TodoFooter.js";

import "./todoList.css";

class TodoList extends Component {
	constructor() {
		super();

		//保存输入框的值，数组
		this.state = {
			todoList: [],
			view: "all"
		};
	}

	/**
	 * addTodo 把输入的内容，添加到li中
	 * @param {[type]} e [event事件]
	 */
	addTodo = e => {
		// console.log(e.key,this.outInput);
		// 通过ref绑定id
		let value = this.outInput.value;
		//如果不是回车或者值为空，return
		if (e.keyCode !== 13 || !value.trim()) return;

		//获取已经保存的值
		let { todoList } = this.state;

		this.setState(
			{
				todoList: [
					{
						id: Math.random(), //生成key
						content: value,
						hasComplete: false //判断li是否被勾选
					},
					//将保存的值，展开
					...todoList
				]
			},
			() => {
				//回调，清空输入框
				this.outInput.value = "";
			}
		);
	}

	/**
	 * deleteTodo 删除todo
	 * @param  {[type]} id [被点击的li的id]
	 * @return {[type]}    [返回过滤后的todoList]
	 */
	deleteTodo = id => {
		//获取已经保存的值
		let { todoList } = this.state;
		//过滤掉id是被删除的,再赋值回去
		todoList = todoList.filter(elt => {
			return elt.id !== id;
		});

		//重新给state赋值
		this.setState({
			todoList
		});
	}

	/**
	 * toggleTodo 切换li勾选状态
	 * @param  {[type]} id [传入被点击的li的id]
	 * @return {[type]}    [返回更新状态后的数据]
	 */
	toggleTodo = id => {
		//获取已经保存的值
		let { todoList } = this.state;
		//被点击的li，状态取反
		todoList = todoList.map((elt, i) => {
			if (elt.id === id) {
				elt.hasComplete = !elt.hasComplete;
			}
			return elt; //返回被更新状态的数组
		});

		//重新给state赋值
		this.setState({
			todoList
		});
	}

	/**
	 * [toggleAll 点击全选方法]
	 * @param  {[type]} ev [传入被点击元素事件]
	 * @return {[type]}    [返回更新状态后的数据]
	 */
	toggleAll = ev => {
		// console.log(ev.target.checked)
		//获取已经保存的值
		let { todoList } = this.state;
		//全选按钮，将其它li状态都切换为全选按钮的状态
		todoList = todoList.map((elt, i) => {
			elt.hasComplete = ev.target.checked;
			return elt; //返回被更新状态的数组
		});

		//重新给state赋值
		this.setState({
			todoList
		});
	}

	/**
	 * 编辑后，更新todoList
	 * @param  {[type]} id      子组件传来的id
	 * @param  {[type]} content 子组件传来的content
	 * @return {[type]}         更新state
	 */
	commitChange = (id, content) => {
		let { todoList } = this.state;
		todoList = todoList.map((elt, i) => {
			if (elt.id == id) {
				elt.content = content;
			}
			return elt;
		});

		this.setState({
			todoList
		});
	}

	/**
	 * 清除完成的TODO
	 */
	clearCompleted=()=>{
		console.log("1")
		//获取已经保存的值
		let { todoList } = this.state;
		//过滤掉id是被删除的,再赋值回去
		todoList = todoList.filter(elt => {
			return !elt.hasComplete;
		});

		//重新给state赋值
		this.setState({
			todoList
		});
	}

	/**
	 * 修改视图显示
	 */
	changeView=(view)=>{
		this.setState({
			view: view
		});
	}

	render() {
		//取出保存在state中的输入框值
		let { todoList, view } = this.state;

		//判断todoList中是否全勾选状态
		let activeTodo = todoList.find(elt => elt.hasComplete === false);

		//判断todoList中是否有勾选状态
		let completeTodo = todoList.find(elt => elt.hasComplete === true);

		let leftItem = 0;

		// 过滤需要展示的数据
		let showData = todoList.filter(elt=>{
			if (elt.hasComplete === false) leftItem++;
			switch (view) {
				case 'active':
				return !elt.hasComplete;
				case 'completed':
				return elt.hasComplete;
				default:
				return true;
			}
		})

		//组件属性可以写成对象
		//content = {elt.content} id={elt.id} deleteTodo={this.deleteTodo}
		//   正则 /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/
		//遍历数组
		let todos = showData.map((elt, i) => {
			return (
				<Todo
					key={elt.id}
					{...{
						content: elt.content,
						id: elt.id,
						hasComplete: elt.hasComplete,
						deleteTodo: this.deleteTodo,
						toggleTodo: this.toggleTodo,
						commitChange: this.commitChange
					}}
				/>
			);
		});
		return (
			<div className="todolist">
				<header className="header">
					<h1>todos</h1>
					{/*输入框  绑定回车事件*/}
					<input
						id="outInput"
						ref={el => (this.outInput = el)}
						className="new-todo"
						type="text"
						placeholder="What needs to be done?"
						onKeyDown={this.addTodo}
					/>
				</header>

				{/* 控制footer显示隐藏 */}
				{
					todoList.length > 0 && (
						<Fragment>
							<section className="main">
								{/*全选按钮,activeTodo判断todoList中是否有全勾选的，或者todoList为空*/}
								<input
									id="toggle-all"
									className="toggle-all"
									type="checkbox"
									checked={!activeTodo && todoList.length > 0}
									onChange={ev => this.toggleAll(ev)}
								/>
								<label htmlFor="toggle-all" />
								{/* todozu组件 */}
								<ul>{todos}</ul>
							</section>
							<TodoFooter 
							{...{
								clearCompleted: this.clearCompleted,
								showClearButton: completeTodo && todoList.length > 0,
								view,
								changeView: this.changeView,
								leftItem
							}}/>
						</Fragment>
					)
				}
				
			</div>
		);
	}
}
export default TodoList;
