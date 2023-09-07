import './../../App.css'

const CategoryTags = ({ tag, getQuestions, setSelectedTag, selectedTag, setAnswers }) => {
	return (
		<p
			className={`d-grid ${selectedTag === tag ? 'categoryTagSelected' : 'categoryTag'}`}
			onClick={() => {
				getQuestions(tag)
				setSelectedTag(tag)
				setAnswers([])
			}}>
			{tag}
		</p>
	)
}

export default CategoryTags
