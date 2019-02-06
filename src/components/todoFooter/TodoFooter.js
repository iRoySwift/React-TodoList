//因为我们用到了jsx，所以需要引入react
import React from "react";

import "./todoFooter.css";

//不需要通过状态传值，可以用函数式组件
export default function (props) {
	let { clearCompleted, showClearButton, view, changeView, leftItem } = props;
	return (
		<footer className="footer">
			<span>
				<strong> { leftItem } </strong>
				<span>item left</span>
			</span>
			<ul className="filter">
				<li>
					<a 
						className={view === "all" ? "selected" : ""}
						onClick={()=>changeView("all")}
						>All</a>
				</li>
				<li>
					<a
						className={view === "active" ? "selected" : ""}
						onClick={()=>changeView("active")}
						>Active</a>
				</li>
				<li>
					<a
						className={view === "completed" ? "selected" : ""}
						onClick={()=>changeView("completed")}
						>Completed</a>
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