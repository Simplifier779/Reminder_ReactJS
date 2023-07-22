import PropTypes from 'prop-types' //helps to specific the type of the prop i.e. INT, STRING,BOOL ETC.
import Button from './Button.js'
import { useLocation } from 'react-router-dom'
const Header = (props) /* props is just the default object to access the prop in the Header section of App if we want to be more specific ,we can also write ({title}) and in this case props.title becomes title*/  => {
const location=useLocation()
  return (
    <header className="header">
        <h1 >{props.title}</h1>
        {/*If we want to do styling in the specific tags itself then we do it in this manner <h1 style={{color:'red',backgroundColor:'black'}}>{props.title}</h1> OR
        If we do it in the form of const and var then we can do it in the form h1 style={headingStyle} */}

        {location.pathname==='/' && <Button color={props.showAdd ? 'red':'green'} text={props.showAdd ? 'Close': 'Add'} onClick={props.onAdd} />}{/*props are used because if we want to have n more buttons of different colors and texts,then we can just assign the value as props and the result is displayed. A bit cleaner and works kinda like a constructor */}
    </header>
  )
}

Header.defaultProps ={  //This default prop is used when we havent passed in any prop in the <Header/ > inside the App function. If we pass something there then this prop is overwritten
    title:'Task Tracker',
}

Header.propTypes={
    title:PropTypes.string.isRequired,
}

const headingStyle={
    color:'red',backgroundColor:'black'
}
export default Header