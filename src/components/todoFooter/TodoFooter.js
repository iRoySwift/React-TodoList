//因为我们用到了jsx，所以需要引入react
import React from "react";
import PT from 'prop-types';
import { Link } from "react-router-dom"

import "./todoFooter.css";

let propTypes = {
	clearCompleted: PT.func, 
	showClearButton: PT.bool, 
	leftItem: PT.number
	// view: PT.oneOf(['all','active','completed']), 
	// changeView: PT.func, 
}

//不需要通过状态传值，可以用函数式组件
export default function Footer(props) {
	let { clearCompleted, showClearButton, pathname, leftItem } = props;
	return (
		<footer className="footer">
			<span>
				<strong> { leftItem } </strong>
				<span>item left</span>
			</span>
			<ul className="filter">
				<li>
					<Link to="/all"
						className={pathname === "/all" ? "selected" : ""}
						>All</Link>
					{/* <a 
						onClick={()=>changeView("all")}
						>All</a> */}
				</li>
				<li>
					<Link to="/active"
						className={pathname === "/active" ? "selected" : ""}
						>Active</Link>
					{/* <a
						onClick={()=>changeView("active")}
						>Active</a> */}
				</li>
				<li>
					<Link to="completed"
						className={pathname === "/completed" ? "selected" : ""}
						></Link>
					{/* <a
						onClick={()=>changeView("completed")}
						>Completed</a> */}
				</li>
				{
					showClearButton && (
					<li>
						<a 
							className="clear-completed"
							onClick={clearCompleted}>
								Clear All Completed
						</a>
					</li>
					)
				}
			</ul>
		</footer>
	);
}

Footer.propTypes = propTypes;
