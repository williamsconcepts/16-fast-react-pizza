import { redirect } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import { isValidPhone } from '../../utils/helpers';
import store from '../../store';
import { clearCart } from '../cart/cartSlice';

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const error = {};

  if (!isValidPhone(order.phone))
    error.phone =
      'Please enter a valid phone number, we might need to call you about your order!';

  if (Object.keys(error).length > 0) return error;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}
