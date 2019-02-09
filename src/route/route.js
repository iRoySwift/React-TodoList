import TodoList from '../containers/todoList/TodoList.js'
import Todo from './../components/todo/Todo.js'
import Footer from '../components/todoFooter/TodoFooter.js'

const route = {
  path: "/",
  componet: TodoList,
  childRoutes: [
    {
      path: "/",
      componet: Footer
    },{
      path: "/",
      component: Todo
    },{
      path: "/all",
      component: Todo
    },{
      path: "/active",
      component: Todo
    },{
      path: "/completed",
      component: Todo
    }
  ]
}
export default route;