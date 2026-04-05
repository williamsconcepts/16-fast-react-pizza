import { isValidPhone } from '../../utils/helpers';

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  };

  const error = {};

  if (!isValidPhone(order.phone))
    error.phone =
      'Please enter a valid phone number, we might need to call you about your order!';

  if (Object.keys(error).length > 0) return error;

  // const newOrder = await createOrder(order);

  // return redirect(`/order/${newOrder.id}`);

  return null;
}
