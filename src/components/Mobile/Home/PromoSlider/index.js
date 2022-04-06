import React, { Component } from "react";

import ContentLoader from "react-content-loader";
import LazyLoad from "react-lazyload";
import { NavLink } from "react-router-dom";
import Ink from "react-ink";

class PromoSlider extends Component {
	render() {
		const { slides, size, secondarySlider } = this.props;
		return (
			<React.Fragment>
				<div
					className={
						secondarySlider
							? "slider-wrapper secondary-slider-wrapper my-20"
							: "slider-wrapper bg-light py-20 my-0"
					}
				>
					{slides.length === 0 ? (
						<ContentLoader
							height={170}
							width={400}
							speed={1.2}
							primaryColor="#f3f3f3"
							secondaryColor="#ecebeb"
						>
							<rect x="20" y="0" rx="4" ry="4" width="168" height="168" />
							<rect x="228" y="0" rx="4" ry="4" width="168" height="168" />
						</ContentLoader>
					) : (
						slides.map((slide) =>
							slide.data.model === "3" ? (
								<a
									href={slide.url}
									className="slider-wrapper__img-wrapper"
									key={slide.data.id}
									style={{ position: "relative" }}
								>
									{/* if customURL then use anchor tag */}
									<LazyLoad>
										<img
											src={slide.data.image}
											alt={slide.data.name}
											className={`slider-wrapper__img slider-cust-img ${!secondarySlider &&
												"slider-wrapper__img-shadow"} custom-promo-img`}
											style={{
												height: (12 / 5) * size + "rem",
												width: (12 / 5) * size + "rem",
											}}
										/>
									</LazyLoad>
									<Ink duration="500" hasTouch={true} />
								</a>
							) : (
								<NavLink
									to={"../" + slide.url}
									className="slider-wrapper__img-wrapper"
									key={slide.data.id}
									style={{ position: "relative" }}
								>
									<LazyLoad>
										<img
											src={slide.data.image}
											alt={slide.data.name}
											className={`slider-wrapper__img slider-cust-img ${!secondarySlider &&
												"slider-wrapper__img-shadow"} custom-promo-img`}
											style={{
												height: (12 / 5) * size + "rem",
												width: (12 / 5) * size + "rem",
											}}
										/>
									</LazyLoad>
									<Ink duration="500" hasTouch={true} />
								</NavLink>
							)
						)
					)}
				</div>
			</React.Fragment>
		);
	}
}

export default PromoSlider;
