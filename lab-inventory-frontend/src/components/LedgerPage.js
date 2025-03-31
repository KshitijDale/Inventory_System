import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Container,
  Card,
  CardContent,
  Grid,
  Box,
  Divider,
  Skeleton,
  useMediaQuery,
  useTheme,
  IconButton,
  Chip
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { getLedger } from "../api";

const LedgerPage = () => {
  const { vendorId } = useParams();
  const [startDate, setStartDate] = useState("");
  const [ledger, setLedger] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const fetchLedger = async () => {
    if (!startDate) {
      alert("Please select a start date.");
      return;
    }

    setLoading(true);
    try {
      const response = await getLedger(token, vendorId, startDate);
      setLedger(response.data.ledger);
    } catch (error) {
      console.error("Error fetching ledger:", error);
    }
    setLoading(false);
  };

  // Format currency values
  const formatCurrency = (value) => {
    if (!value || value === "-") return "-";
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(value);
  };

  // Render mobile view with cards
  const renderMobileView = () => (
    <Box>
      {ledger.map((entry, index) => (
        <Card key={index} variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle2" color="text.secondary">
                {new Date(entry.date).toLocaleDateString()}
              </Typography>
              <Chip
                label={entry.debit ? "DEBIT" : "CREDIT"}
                color={entry.debit ? "error" : "success"}
                size="small"
              />
            </Box>
            
            <Typography variant="body1" sx={{ mb: 1 }}>
              {entry.details}
            </Typography>
            
            <Divider sx={{ my: 1 }} />
            
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">Amount</Typography>
                <Typography variant="body2" sx={{ fontWeight: entry.debit ? 'bold' : 'normal', color: entry.debit ? 'error.main' : 'success.main' }}>
                  {entry.debit ? formatCurrency(entry.debit) : formatCurrency(entry.credit)}
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: 'right' }}>
                <Typography variant="caption" color="text.secondary">Balance</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {formatCurrency(entry.running_balance)}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  // Render desktop view with table
  const renderDesktopView = () => (
    <TableContainer component={Paper} elevation={2}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Debit</TableCell>
            <TableCell align="right">Credit</TableCell>
            <TableCell align="right">Running Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ledger.map((entry, index) => (
            <TableRow 
              key={index}
              sx={{ 
                '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover },
                '&:hover': { backgroundColor: theme.palette.action.selected }
              }}
            >
              <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
              <TableCell>{entry.details}</TableCell>
              <TableCell align="right" sx={{ color: entry.debit ? 'error.main' : 'inherit' }}>
                {entry.debit ? formatCurrency(entry.debit) : "-"}
              </TableCell>
              <TableCell align="right" sx={{ color: entry.credit ? 'success.main' : 'inherit' }}>
                {entry.credit ? formatCurrency(entry.credit) : "-"}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                {formatCurrency(entry.running_balance)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  // Loading skeleton
  const renderLoadingSkeleton = () => (
    isMobile ? (
      <Box>
        {[1, 2, 3].map((item) => (
          <Card key={item} variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Skeleton variant="text" width="30%" height={24} />
              <Skeleton variant="text" width="70%" height={30} />
              <Skeleton variant="text" width="100%" height={20} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Skeleton variant="text" width="40%" height={24} />
                <Skeleton variant="text" width="40%" height={24} />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    ) : (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Debit</TableCell>
              <TableCell>Credit</TableCell>
              <TableCell>Running Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[1, 2, 3, 4, 5].map((item) => (
              <TableRow key={item}>
                <TableCell><Skeleton variant="text" /></TableCell>
                <TableCell><Skeleton variant="text" /></TableCell>
                <TableCell><Skeleton variant="text" /></TableCell>
                <TableCell><Skeleton variant="text" /></TableCell>
                <TableCell><Skeleton variant="text" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton 
          onClick={() => navigate(-1)} 
          sx={{ mr: 2 }}
          aria-label="back"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" component="h1">
          Vendor Ledger
        </Typography>
      </Box>

      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 2, md: 3 }, 
          mb: 3,
          borderRadius: 2
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: <CalendarTodayIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={fetchLedger}
              fullWidth={isMobile}
              startIcon={<SearchIcon />}
              size={isMobile ? "large" : "medium"}
              sx={{ py: isMobile ? 1.5 : 1 }}
            >
              Fetch Ledger
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {loading ? (
        renderLoadingSkeleton()
      ) : ledger.length > 0 ? (
        isMobile ? renderMobileView() : renderDesktopView()
      ) : (
        <Card variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="text.secondary">
            No ledger entries found. Please select a date and fetch the ledger.
          </Typography>
        </Card>
      )}
    </Container>
  );
};

export default LedgerPage;