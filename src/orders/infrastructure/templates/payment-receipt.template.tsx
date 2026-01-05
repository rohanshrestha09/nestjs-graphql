import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import 'react';

interface PaymentReceiptEmailProps {
  orderId: string;
  transactionId: string;
  amount: number;
  currency: string;
  customerName?: string;
}

export const PaymentReceiptEmail = ({
  orderId,
  transactionId,
  amount,
  currency,
  customerName,
}: PaymentReceiptEmailProps) => {
  const formattedAmount = (amount / 100).toFixed(2);

  return (
    <Html>
      <Head />
      <Preview>Payment received for order {orderId}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Payment Received</Heading>
          <Text style={text}>
            {customerName ? `Hi ${customerName},` : 'Hi there,'}
          </Text>
          <Text style={text}>
            We&apos;ve received your payment for order{' '}
            <strong>{orderId}</strong>.
          </Text>
          <Section style={receiptBox}>
            <Text style={receiptLabel}>Transaction ID</Text>
            <Text style={receiptValue}>{transactionId}</Text>
            <Hr style={hr} />
            <Text style={receiptLabel}>Order ID</Text>
            <Text style={receiptValue}>{orderId}</Text>
            <Hr style={hr} />
            <Text style={receiptLabel}>Amount Paid</Text>
            <Text style={amountValue}>
              {currency} {formattedAmount}
            </Text>
          </Section>
          <Text style={text}>Thank you for your purchase!</Text>
          <Hr style={hr} />
          <Text style={footer}>
            This is your payment receipt. Keep it for your records.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '560px',
  borderRadius: '8px',
};

const heading = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#1a1a1a',
  marginBottom: '24px',
};

const text = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#484848',
};

const receiptBox = {
  backgroundColor: '#f0fdf4',
  border: '1px solid #bbf7d0',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
};

const receiptLabel = {
  fontSize: '12px',
  color: '#6b7280',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0 0 4px 0',
};

const receiptValue = {
  fontSize: '16px',
  fontWeight: '500',
  color: '#1a1a1a',
  margin: '0 0 16px 0',
};

const amountValue = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#16a34a',
  margin: '0',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '16px 0',
};

const footer = {
  fontSize: '14px',
  color: '#9ca3af',
};
