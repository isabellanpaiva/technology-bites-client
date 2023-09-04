import './../../App.css'
import { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import ResponseCard from '../ResponseCard/ResponseCard'

const CarouselChallenge = ({ responses, type }) => {
	const [index, setIndex] = useState(0)

	const handleSelect = selectedIndex => {
		setIndex(selectedIndex)
	}

	return (

		<Carousel
			activeIndex={index}
			onSelect={handleSelect}
			data-bs-theme='light'
			prevIcon={<span className="CarouselPrevIcon"></span>}
			nextIcon={<span className="CarouselNextIcon"></span>}
		>
			{responses.map(eachResponse => {
				return (
					<Carousel.Item key={eachResponse._id}>
						<ResponseCard
							response={eachResponse}
							challenge={eachResponse.relatedChallenge}
							type={type}
						/>
					</Carousel.Item>
				)
			})}
		</Carousel>
	)
}

export default CarouselChallenge
