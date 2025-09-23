import React, { useState } from 'react';
import { MainLayout, Typography, PrimaryButton } from '../components';
import {
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Autocomplete,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Alert,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Badge
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart as CartIcon,
  Search as SearchIcon,
  Scanner as ScannerIcon,
  Receipt as ReceiptIcon,
  Person as PersonIcon,
  LocalPharmacy as PharmacyIcon,
  Print as PrintIcon,
  Clear as ClearIcon
} from '@mui/icons-material';

const PharmacyPage = () => {
  // State management
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [paymentDialog, setPaymentDialog] = useState(false);
  const [receiptDialog, setReceiptDialog] = useState(false);
  const [lastTransaction, setLastTransaction] = useState(null);

  // Mock data - in real app, this would come from API
  const [availableProducts] = useState([
    {
      id: 1,
      name: 'Paracetamol 500mg',
      sku: 'MED001',
      category: 'Pain Relief',
      price: 15.00,
      stock: 500,
      unit: 'Tablet',
      prescription: false
    },
    {
      id: 2,
      name: 'Amoxicillin 250mg',
      sku: 'MED002',
      category: 'Antibiotic',
      price: 45.00,
      stock: 200,
      unit: 'Capsule',
      prescription: true
    },
    {
      id: 3,
      name: 'Surgical Mask',
      sku: 'PPE001',
      category: 'PPE',
      price: 25.00,
      stock: 1000,
      unit: 'Piece',
      prescription: false
    },
    {
      id: 4,
      name: 'Digital Thermometer',
      sku: 'EQP001',
      category: 'Equipment',
      price: 850.00,
      stock: 50,
      unit: 'Piece',
      prescription: false
    },
    {
      id: 5,
      name: 'Insulin Injection',
      sku: 'MED003',
      category: 'Diabetes',
      price: 125.00,
      stock: 75,
      unit: 'Vial',
      prescription: true
    }
  ]);

  const [patients] = useState([
    { id: 1, name: 'John Doe', phone: '0771234567', type: 'Outpatient' },
    { id: 2, name: 'Jane Smith', phone: '0777654321', type: 'Inpatient', ward: 'Ward A', bed: 'A-12' },
    { id: 3, name: 'Bob Johnson', phone: '0771111111', type: 'Outpatient' },
    { id: 4, name: 'Alice Brown', phone: '0772222222', type: 'Inpatient', ward: 'ICU', bed: 'ICU-3' }
  ]);

  // Calculate totals
  const subtotal = selectedProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  // Add product to cart
  const addToCart = (product) => {
    const existingItem = selectedProducts.find(item => item.id === product.id);
    if (existingItem) {
      setSelectedProducts(selectedProducts.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
  };

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setSelectedProducts(selectedProducts.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setSelectedProducts(selectedProducts.filter(item => item.id !== id));
  };

  // Clear cart
  const clearCart = () => {
    setSelectedProducts([]);
    setSelectedPatient(null);
  };

  // Process payment
  const processPayment = () => {
    if (!selectedPatient || selectedProducts.length === 0) {
      return;
    }

    const transaction = {
      id: Date.now(),
      patient: selectedPatient,
      items: selectedProducts,
      subtotal,
      tax,
      total,
      timestamp: new Date(),
      cashier: 'Current User' // In real app, get from auth context
    };

    setLastTransaction(transaction);
    setPaymentDialog(false);
    setReceiptDialog(true);
    clearCart();
  };

  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <PharmacyIcon sx={{ mr: 2, fontSize: 32, color: 'primary.main' }} />
          <Box>
            <Typography variant="h4" component="h1">
              Pharmacy POS System
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Point of Sale for medication and medical supply dispensing
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Left Side - Product Search & Selection */}
          <Grid item xs={12} md={8}>
            {/* Product Search */}
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Autocomplete
                    options={availableProducts}
                    getOptionLabel={(option) => `${option.name} (${option.sku})`}
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body1">{option.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {option.sku} • {option.category} • LKR {option.price.toFixed(2)} • Stock: {option.stock}
                          </Typography>
                        </Box>
                        <Chip
                          label={option.prescription ? 'Prescription' : 'OTC'}
                          size="small"
                          color={option.prescription ? 'warning' : 'success'}
                        />
                      </Box>
                    )}
                    onChange={(event, value) => {
                      if (value) {
                        addToCart(value);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search Products"
                        placeholder="Type product name or scan barcode..."
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
                        }}
                      />
                    )}
                    sx={{ flexGrow: 1 }}
                  />
                  <PrimaryButton
                    variant="outlined"
                    startIcon={<ScannerIcon />}
                    onClick={() => console.log('Open barcode scanner')}
                  >
                    Scan
                  </PrimaryButton>
                </Box>

                {/* Quick Product Grid */}
                <Typography variant="h6" gutterBottom>Quick Select</Typography>
                <Grid container spacing={1}>
                  {availableProducts.slice(0, 6).map((product) => (
                    <Grid item xs={6} sm={4} md={2} key={product.id}>
                      <Card
                        sx={{
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          '&:hover': { transform: 'translateY(-2px)', boxShadow: 2 }
                        }}
                        onClick={() => addToCart(product)}
                      >
                        <CardContent sx={{ p: 1, textAlign: 'center' }}>
                          <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}>
                            {product.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            LKR {product.price.toFixed(2)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* Shopping Cart */}
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CartIcon sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      Shopping Cart ({selectedProducts.length} items)
                    </Typography>
                  </Box>
                  {selectedProducts.length > 0 && (
                    <PrimaryButton
                      variant="outlined"
                      size="small"
                      startIcon={<ClearIcon />}
                      onClick={clearCart}
                    >
                      Clear All
                    </PrimaryButton>
                  )}
                </Box>

                {selectedProducts.length === 0 ? (
                  <Alert severity="info">
                    No items in cart. Search and select products above to add them.
                  </Alert>
                ) : (
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell align="center">Quantity</TableCell>
                          <TableCell align="right">Unit Price</TableCell>
                          <TableCell align="right">Total</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedProducts.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                  {item.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {item.sku} • {item.category}
                                  {item.prescription && (
                                    <Chip label="Prescription" size="small" color="warning" sx={{ ml: 1 }} />
                                  )}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell align="center">
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <IconButton
                                  size="small"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <RemoveIcon />
                                </IconButton>
                                <Typography sx={{ mx: 2, minWidth: '20px', textAlign: 'center' }}>
                                  {item.quantity}
                                </Typography>
                                <IconButton
                                  size="small"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <AddIcon />
                                </IconButton>
                              </Box>
                            </TableCell>
                            <TableCell align="right">
                              LKR {item.price.toFixed(2)}
                            </TableCell>
                            <TableCell align="right">
                              LKR {(item.price * item.quantity).toFixed(2)}
                            </TableCell>
                            <TableCell align="center">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Right Side - Patient & Checkout */}
          <Grid item xs={12} md={4}>
            {/* Patient Selection */}
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <PersonIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Patient Information
                </Typography>
                
                <Autocomplete
                  options={patients}
                  getOptionLabel={(option) => `${option.name} (${option.phone})`}
                  value={selectedPatient}
                  onChange={(event, value) => setSelectedPatient(value)}
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      <Box>
                        <Typography variant="body2">{option.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {option.phone} • {option.type}
                          {option.ward && ` • ${option.ward} - ${option.bed}`}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Patient"
                      placeholder="Search by name or phone..."
                    />
                  )}
                />

                {selectedPatient && (
                  <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {selectedPatient.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Phone: {selectedPatient.phone}
                    </Typography>
                    <br />
                    <Typography variant="caption" color="text.secondary">
                      Type: {selectedPatient.type}
                      {selectedPatient.ward && ` • ${selectedPatient.ward} - ${selectedPatient.bed}`}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Checkout Summary */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <ReceiptIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Checkout Summary
                </Typography>

                {selectedProducts.length > 0 ? (
                  <>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Subtotal:</Typography>
                        <Typography variant="body2">LKR {subtotal.toFixed(2)}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Tax (10%):</Typography>
                        <Typography variant="body2">LKR {tax.toFixed(2)}</Typography>
                      </Box>
                      <Divider />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total:</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                          LKR {total.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>

                    <PrimaryButton
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={!selectedPatient || selectedProducts.length === 0}
                      onClick={() => setPaymentDialog(true)}
                      sx={{ mb: 1 }}
                    >
                      Process Payment
                    </PrimaryButton>
                  </>
                ) : (
                  <Alert severity="info">
                    Add items to cart to see checkout summary
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Payment Confirmation Dialog */}
        <Dialog open={paymentDialog} onClose={() => setPaymentDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Confirm Payment</DialogTitle>
          <DialogContent>
            <Typography variant="h6" gutterBottom>
              Patient: {selectedPatient?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {selectedPatient?.type} • {selectedPatient?.phone}
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Total Amount: LKR {total.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedProducts.length} items
              </Typography>
            </Box>

            <Alert severity="warning" sx={{ mt: 2 }}>
              Please verify prescription requirements before dispensing medication.
            </Alert>
          </DialogContent>
          <DialogActions>
            <PrimaryButton onClick={() => setPaymentDialog(false)}>
              Cancel
            </PrimaryButton>
            <PrimaryButton variant="contained" onClick={processPayment}>
              Confirm Payment
            </PrimaryButton>
          </DialogActions>
        </Dialog>

        {/* Receipt Dialog */}
        <Dialog open={receiptDialog} onClose={() => setReceiptDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            Transaction Complete
            <IconButton
              sx={{ position: 'absolute', right: 8, top: 8 }}
              onClick={() => console.log('Print receipt')}
            >
              <PrintIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {lastTransaction && (
              <Box>
                <Alert severity="success" sx={{ mb: 2 }}>
                  Payment processed successfully!
                </Alert>

                <Typography variant="h6" gutterBottom>Receipt</Typography>
                <Typography variant="body2">
                  Transaction ID: {lastTransaction.id}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Date: {lastTransaction.timestamp.toLocaleString()}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Patient: {lastTransaction.patient.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Phone: {lastTransaction.patient.phone}
                </Typography>

                <List dense>
                  {lastTransaction.items.map((item, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemText
                        primary={`${item.name} x${item.quantity}`}
                        secondary={`LKR ${item.price.toFixed(2)} each`}
                      />
                      <Typography variant="body2">
                        LKR {(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </ListItem>
                  ))}
                </List>

                <Divider />
                <Box sx={{ mt: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Subtotal:</Typography>
                    <Typography variant="body2">LKR {lastTransaction.subtotal.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Tax:</Typography>
                    <Typography variant="body2">LKR {lastTransaction.tax.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total:</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      LKR {lastTransaction.total.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <PrimaryButton onClick={() => setReceiptDialog(false)}>
              Close
            </PrimaryButton>
          </DialogActions>
        </Dialog>
      </Box>
    </MainLayout>
  );
};

export default PharmacyPage;