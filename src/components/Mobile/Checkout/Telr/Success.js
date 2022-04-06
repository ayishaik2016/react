import React, { Component } from "react";
import { connect } from "react-redux";
import { placeOrder } from "../../../../services/checkout/actions";
import { updateUserInfo } from "../../../../services/user/actions";
import Countdown from 'react-countdown';
import { Redirect } from "react-router";

class Success extends Component {

	state = {
		placeOrderError: false,
		errorMessage: ""
	}

	countdownTimer ({ hours, minutes, seconds, completed }) {
		if (completed) {
		  // Render a completed state
		  return <Redirect to="/cart" />;
		} else {
		  // Render a countdown
		  return <h3>This page will redirect in <span>{minutes}:{seconds}</span></h3>;
		}
	};
	  

	componentDidMount() {
		if(localStorage.getItem("transaction_id")) {
			this.__placeOrder();
		}
	}

	__placeOrder() {
		let cartData = JSON.parse(localStorage.getItem("cart_state"));
		if (localStorage.getItem("userSelected") === "SELFPICKUP") {
			this.props.placeOrder(
					cartData.user,
					cartData.cartProducts,
					cartData.coupon.success ? cartData.coupon : null,
					JSON.parse(localStorage.getItem("userSetAddress")),
					localStorage.getItem("orderComment"),
					cartData.cartTotal,
					"TELR",
					localStorage.getItem("transaction_id"),
					2,
					cartData.walletChecked,
					cartData.distance,
					false,
					null,
					null
				)
				.then((response) => {
					if (response) {
						if (!response.success) {
							this.setState({ placeOrderError: true, errorMessage: response.message });
							if (response.status === 429) {
								this.setState({ errorMessage: localStorage.getItem("tooManyApiCallMessage") });
							}
						}
						localStorage.removeItem('transaction_id');
					}
				});
		} else {
			this.props.placeOrder(
					cartData.user,
					cartData.cartProducts,
					cartData.coupon.success ? cartData.coupon : null,
					JSON.parse(localStorage.getItem("userSetAddress")),
					localStorage.getItem("orderComment"),
					cartData.cartTotal,
					"TELR",
					localStorage.getItem("transaction_id"),
					2,
					cartData.walletChecked,
					cartData.distance,
					false,
					null,
					null,
					cartData.tipAmount,
					cartData.cashChange
				)
				.then((response) => {
					if (response) {
						console.log("Came here");
						console.log("THIS", response);
						if (response.status === 401) {
							this.setState({
								placeOrderError: true,
								errorMessage: localStorage.getItem("userInActiveMessage"),
							});
						} else if (!response.success) {
							this.setState({ placeOrderError: true, errorMessage: response.message });
							if (response.status === 429) {
								this.setState({ errorMessage: localStorage.getItem("tooManyApiCallMessage") });
							}
						}
						localStorage.removeItem('transaction_id');
					}
				});
		}
	}
	
	render() {
		return (
			<React.Fragment>
				<div className="pt-50">
				<div className="pt-30"/>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height:500,
							flexDirection:'column'
						}}
					>
						<h1 style={{color:"green",fontWeight:700}}>Payment success</h1>
						<Countdown
							date={Date.now() + 5000}
							renderer={this.countdownTimer}
						/>
						{/* <h3>You will redirect to cart page in <span>{this.state.seconds}</span> seconds</h3> */}
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.user.user,
	addresses: state.addresses.addresses,
	cartProducts: state.cart.products,
	cartTotal: state.total.data,
	coupon: state.coupon.coupon,
	checkout: state.checkout.checkout,
	restaurant_info: state.items.restaurant_info,
});

export default connect(
	mapStateToProps,
	{ placeOrder, updateUserInfo }
)(Success);
