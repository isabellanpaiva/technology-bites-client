import './../../App.css'
import { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import ResponseCard from '../ResponseCard/ResponseCard'

const CarouselResponses = ({ responses, type, getResponses }) => {
	const [index, setIndex] = useState(0)

	const handleSelect = selectedIndex => {
		setIndex(selectedIndex)
	}

	return (
		<Carousel
			className='Carousel'
			activeIndex={index}
			onSelect={handleSelect}
			data-bs-theme='dark'>
			{responses.map(eachResponse => {
				return (
					<Carousel.Item key={eachResponse._id}>
						<ResponseCard
							response={eachResponse}
							getResponses={getResponses}
							challenge={eachResponse.relatedChallenge}
							type={type}
						/>
					</Carousel.Item>
				)
			})}
		</Carousel>
	)
}

export default CarouselResponses
