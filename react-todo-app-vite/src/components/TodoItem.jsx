import styles from '@/styles/TodoItem.module.scss'

const TodoItem = ({ itemProp, handleChange, deleteTodo }) => {
  return (
    <li className={ styles.item }>
      <div className={ styles.content }>
        <input 
          type="checkbox"
          checked={ itemProp.completed }
          onChange={ () => handleChange(itemProp.id) } />
        <button onClick={ () => deleteTodo(itemProp.id) }>Delete</button>
        { itemProp.title }
      </div>
    </li>
  )
}

export default TodoItem
