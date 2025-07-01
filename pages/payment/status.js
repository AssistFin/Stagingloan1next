import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { verifyLoanPayment } from '../../api/payment';

export default function PaymentStatusPage() {
  const router = useRouter();
  const { payment_reference } = router.query;

  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!payment_reference) return;

    const verifyPayment = async () => {
      try {
        const data = await verifyLoanPayment(payment_reference);

        if (data.status === 'success') {
          setStatus('success');
          setMessage(data.message || 'Payment was successful.');
        } else {
          setStatus('failed');
          setMessage(data.message || 'Payment failed or is pending.');
        }
      } catch (err) {
        console.error(err);
        setStatus('failed');
        setMessage(err.message || 'An error occurred while verifying the payment.');
      }
    };

    verifyPayment();
  }, [payment_reference]);

  if (status === 'loading') return <p>Verifying payment, please wait...</p>;

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>{status === 'success' ? '🎉 Payment Successful' : '❌ Payment Failed'}</h1>
      <p>{message}</p>
      <button onClick={() => router.push('/')}>Go Home</button>
    </div>
  );
}
