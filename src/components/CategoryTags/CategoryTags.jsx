import './../../App.css'

const CategoryTags = ({ tag, getQuestions }) => {

    return (

        <p>
            <button className="d-grid categoryTag" onClick={() => getQuestions(tag)}> {tag}</button>
        </p>
    )
}

export default CategoryTags