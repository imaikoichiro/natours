import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51KtJgMHgMrpT18GtvRA5rzlTqRQTnx9Ba9IqqK3HwGv4cyOPKuJexQz53s8TYB0JsMrZHYoDCnXVngat44ewQ3Mh00un41ERHm'
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
