//This module creates the toggleable 'Order for delivery box'
//and handles the data transfer between the order form and the
//express server. 

import React from 'react';
import { Container, Row, Col, Table, Button, UncontrolledCollapse } from 'reactstrap';
import menuImport from './menu';

//Sweetalert provides improved window alerts
import swal from '@sweetalert/with-react';


//Creates the parent component for the order form and holds the state
class OrderParent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { orderArray: [], menu: menuImport };
    }

        //Function: sends the client order to the server.
    placeOrder = () => {
        let order = []

        this.state.orderArray.forEach((item) => { order.push(item) })

        //Calculate the price of the client's order
        let orderPrice = [0];
        this.state.orderArray.forEach((item) => { orderPrice.push(item.price) })
        orderPrice = orderPrice.reduce((a, b) => { return a + b })

        //POST the order to the server
        let sendOrder = []
        order.map((item) => {sendOrder.push(item.name)});
       

        //Confirm the order on screen with a sweetalert pop-up box (conditional operator)
        order.length === 0 ? swal(<div> 
            <h3>There's nothing here!</h3>
            <p>Add some items to your order and try again.</p>
        </div>)

            : swal(<div>

                <h4>Order confirmed!</h4>
                <h6>Here is a summary:</h6>


                <Table borderless striped responsive>
                    <tbody>
                        {this.state.orderArray.map((item,index) => {
                            return <tr>
                                <td key ={'swalItem' + index}>{item.name}</td>
                                <td key ={'swalPrice' + index}>€{item.price.toFixed(2)}</td>
                            </tr>
                        })
                        }
                    </tbody>
                </Table>

                <h3>Total price : € {orderPrice.toFixed(2)}</h3>

            </div>,
                { icon: 'success' })
        //End of sweet alert
    }
    //End of the 'Place Order' function

    //Function: 'Add to Order' button functionality (adds the desired item to the client's order)
    addToOrder = (e) => {
        let order = this.state.orderArray
        order.push(this.state.menu[e.target.id])

        this.setState({ orderArray: order })
    }
    //End of 'Add to Order' button functionality

    //Function: 'Remove from Order' button functionality (removes the selected item from the client's order)
    removeFromOrder = (e) => {
        let order = this.state.orderArray
        order.splice(e.target.id, 1)
        this.setState({ orderArray: order })
    }
    //End of 'Remoce from Order' button functionality

    //Renders the dynamic order module to the app
    render() {
        return (

            <div className='orderModule'>
                <div>
                    <h3 className='sectionHeader'>Order for delivery</h3>
                    <p className='sectionHeader'><i>Place your order for delivery (terms and conditions apply)</i></p>

                    <div className='orderHeader'>
                        <Button color="info" id="openOrderButton">
                            Order now
                        </Button>
                    </div>
                </div>
                <UncontrolledCollapse toggler="#openOrderButton">
                    <Container className='orderForm'>

                        <Row>
                            <Col><OrderMenu orderArray={this.state.orderArray} addToOrder={this.addToOrder} menu={this.state.menu} /></Col>
                            <Col><ClientOrder orderArray={this.state.orderArray} removeFromOrder={this.removeFromOrder} menu={this.state.menu} /></Col>
                        </Row>
                        <Row>
                            <OrderNow placeOrder={this.placeOrder} calculatePrice={this.calculatePrice} />
                        </Row>
                    </Container>
                </UncontrolledCollapse>

            </div>


        )
    }
}
//End of parent component

//Component: interactive menu; used for creating a custom food order
class OrderMenu extends React.Component {
    render() {
        return (
            <Table striped borderless responsive>
                <thead>
                    <tr>
                        <th>
                            Dish
                        </th>
                        <th>
                            Price
                        </th>
                        <th>
                            Add to order
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.menu.map((item, index) => {
                        return <tr>
                            <td key ={'OrderMenuItem' + index}>{item.name}</td>
                            <td key ={'OrderMenuPrice' + index}>€{item.price.toFixed(2)}</td>
                            <td key ={'OrderMenuButton' + index}>{<button id={index} className='addToOrderButton' onClick={this.props.addToOrder} >Add to order</button>}</td>
                        </tr>
                    })
                    }
                </tbody>

            </Table>
        )
    }
}
//End of interactive menu component

//Component: Order management; displays the client's food order, calculates the total price, and allows the client to remove items from the food order
class ClientOrder extends React.Component {

    render() {

        let prices = []
        this.props.orderArray.forEach((item) => { prices.push(item.price) })
        prices.length > 0 ? prices = prices.reduce(function (a, b) { return a + b }) : prices = [0]

        return (
            this.props.orderArray >= 0 ? <div>
                <h3 className='sectionHeader'>Your order</h3>
                <p className='sectionHeader'>There's nothing here yet!</p>
            </div>
                :
                <div>
                    <h3 className='sectionHeader'>Your order</h3>
                    <Table striped borderless responsive>
                        <thead>
                            <tr>
                                <th>
                                    Dish
                                </th>
                                <th>
                                    Price
                                </th>
                                <th>
                                    Remove
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.orderArray.map((item, index) => {
                                return <tr>
                                    <td key = {'ClientOrderItem' + index}>{item.name}</td>
                                    <td key ={'ClientOrderPrice' + index}>€{item.price.toFixed(2)}</td>
                                    <td key ={'ClientOrderButton' + index}>{<button id={index} onClick={this.props.removeFromOrder} className='removeFromOrderButton'>Remove</button>}</td>
                                </tr>
                            })
                            }
                        </tbody>

                    </Table>
                    <div>
                        <h3>Total price: €{prices.toFixed(2)}</h3>
                    </div>
                </div>
        )
    }

}
//End of the order management component

//Submits the order to the restaurant via an express server
class OrderNow extends React.Component {
    render() {
        return <Button id='placeOrderButton' color='info' onClick={this.props.placeOrder}>Place Order</Button>
    }
}
//End of order submission

//Export the module to the primary app
export default OrderParent