import React, { Component, createRef } from "react";

import "./todo.css";

export default class Todo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inEdit: false
		}
		// 获取真实dom
		this.editInput = createRef();
	}

	/**
	 * 双击编辑状态
	 * 获取焦点
	 */
	onEdit = () => {
		let input = this.editInput.current;

		this.setState({
			inEdit: true
		}, () => {
			// console.log(this.editInput.current);
			input.value = this.props.content;
			input.focus();
		});
	}

	/**
	 * 失焦关闭编辑
	 */
	onBlur = () => {
		// 判断状态是否被键盘事件改变
		if (!this.state.inEdit) return;

		this.setState({
			inEdit: false
		}, () => {
			// debugger
			this.commitAlter();
		});
	}

	/**
	 * esc 回车 关闭编辑
	 */
	onKeyDown = (e) => {
		if (e.keyCode === 27 || e.keyCode === 13) {
			this.setState({
				inEdit: false
			});
		}

		// 回车更新内容，esc取消
		if (e.keyCode === 13) {
			this.commitAlter();
		}
	}

	/**
	 * 修改内容
	 * @param  {[type]} id      组件id
	 * @param  {[type]} content label内容
	 * @return {[type]}         调用父组件方法
	 */
	commitAlter = () => {
		let input = this.editInput.current;
		let content = input.value;
		let id = this.props.id;

		if (content.trim()) {
			this.props.commitChange(id, content);
		} else {
			// 删除
			this.props.deleteTodo(id)
		};

		// 清空输入框
		input.value = "";
	}

	render() {
		let { content, id, hasComplete, deleteTodo, toggleTodo } = this.props;
		let className = this.state.inEdit ? "editShow" : "completed";


		return (
			<li
				className={className}
			// className="completed"
			>
				<div className="item-list">
					{/* 勾选按钮 */}
					<input
						className="toggle"
						type="checkbox"
						checked={hasComplete}
						onChange={() => toggleTodo(id)}
					/>
					{/* todo 的内容 */}
					<label
						htmlFor=""
						onDoubleClick={this.onEdit}
					>
						{content}
					</label>
					{/* 删除按钮 */}
					{/* 给button添加点击事件，回调方法,并将该对象的id传到父类中 */}
					<button
						className="destory"
						onClick={() => deleteTodo(id)}
					/>
					<input
						ref={this.editInput}
						className="edit-input"
						type="text"
						onBlur={this.onBlur}
						onKeyDown={this.onKeyDown}
					/>
				</div>
			</li>
		);
	}
}
