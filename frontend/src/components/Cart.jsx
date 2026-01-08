import './Cart.css';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);

const Cart = ({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem }) => {
  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className="lumina-cart-overlay" onClick={onClose} />
      <div className="lumina-cart">
        <div className="lumina-cart__header">
          <h2>Shopping Cart ({totalItems})</h2>
          <button
            type="button"
            className="lumina-cart__close"
            onClick={onClose}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <div className="lumina-cart__body">
          {cart.length === 0 ? (
            <div className="lumina-cart__empty">
              <svg viewBox="0 0 24 24" className="lumina-cart__empty-icon">
                <path
                  d="M3 5h2l2.6 9.4a1 1 0 0 0 .96.73h8.78a1 1 0 0 0 .97-.76L19 7H6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="10" cy="19" r="1.2" fill="currentColor" />
                <circle cx="17" cy="19" r="1.2" fill="currentColor" />
              </svg>
              <p>Your cart is empty</p>
              <span>Add some products to get started!</span>
            </div>
          ) : (
            <div className="lumina-cart__items">
              {cart.map((item) => (
                <div key={item.id} className="lumina-cart-item">
                  <img src={item.image} alt={item.title} />
                  <div className="lumina-cart-item__details">
                    <h3>{item.title}</h3>
                    <p className="lumina-cart-item__price">{formatCurrency(item.price)}</p>
                    <div className="lumina-cart-item__controls">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="lumina-cart-item__remove"
                    onClick={() => onRemoveItem(item.id)}
                    aria-label="Remove item"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="lumina-cart__footer">
            <div className="lumina-cart__total">
              <span>Total</span>
              <span className="lumina-cart__total-amount">{formatCurrency(total)}</span>
            </div>
            <button type="button" className="lumina-cart__checkout">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
