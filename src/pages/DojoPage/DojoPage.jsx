import { useEffect, useState } from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import DojoCard from '../../components/DojoCard/DojoCard'
import CategoryTags from '../../components/CategoryTags/CategoryTags'
import dojoServices from '../../services/dojo.services'

const DojoPage = () => {

    const [tags, setTags] = useState([])
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        loadTags()
    }, [])

    const loadTags = () => {

        dojoServices
            .getDojoCategories()
            .then(({ data }) => setTags(data))
            .catch(err => console.log(err))
    }

    const getQuestions = (category) => {

        dojoServices
            .getDojoQuestions(category)
            .then(({ data }) => setQuestions(data))
            .catch(err => console.log(err))
    }

    const checkResponse = (question, userAnswer) => {

        const result = question.validation === userAnswer ? "right" : "wrong"

        // result === true {
        //      updateTrue() 
        // } : updateFalse()

    }

    return (

        <Container className="PageContainer">

            <section style={{ marginBottom: '5em' }}>
                <h1 className='PageHeading' style={{ fontSize: '3em' }}>
                    Dojo
                </h1>

                <h3 className='PageSubHeading'> Select a category and prove yourself! </h3>
            </section>

            <Row>

                <section className="mb-5">

                    <Row>

                        {
                            tags &&
                            tags.map(tag => (
                                <Col key={tag} style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
                                    <CategoryTags tag={tag} getQuestions={getQuestions} />
                                </Col>
                            ))
                        }

                    </Row>

                </section>

                <section>

                    {
                        questions &&
                        <ListGroup>
                            {
                                questions.map(question => (

                                    <ListGroup.Item key={question._id} className="dojoList">

                                        <Row>

                                            {question.statement}

                                        </Row>

                                        <button onClick={() => checkResponse(question, true)} >
                                            True
                                        </button>

                                        <button onClick={() => checkResponse(question.validation, false)}>
                                            False
                                        </button>

                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    }

                </section>

            </Row >

        </Container >
    )
}

export default DojoPage