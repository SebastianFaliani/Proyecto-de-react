import { Row, Col, Card, Button } from "react-bootstrap";
import useDrinks from "../../hooks/useDrinks";
import PropTypes from "prop-types";
import useCart from "../../hooks/useCart";

export default function DrinkCard({ drink }) {
    const { handleModalClick, handleDrinkIdClick } = useDrinks();
    const { addToCart } = useCart();
    return (
        <Col md={6} lg={3}>
            <Card clasName="mb-4">
                <Card.Img variant="top" src={drink.strDrinkThumb} alt={`Imagen de ${drink.strDrink}`} />

                <Card.Body>
                    <Card.Title>{drink.strDrink}</Card.Title>
                    <Card.Subtitle className="mb-2">{drink.price}</Card.Subtitle>
                    <Row>
                        <Col>
                            <Button
                                variant="warning"
                                className="text-uppercase"
                                onClick={() => {
                                    handleModalClick();
                                    handleDrinkIdClick(drink.idDrink);
                                }}
                            >
                                Ver Receta
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                variant="primary"
                                className="text-uppercase"
                                onClick={() => {
                                    addToCart(drink);
                                }}
                            >
                                Agregar al carrito
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    );
}
DrinkCard.propTypes = {
    drink: PropTypes.shape({
        strDrinkThumb: PropTypes.string.isRequired,
        strDrink: PropTypes.string.isRequired,
        idDrink: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
};
