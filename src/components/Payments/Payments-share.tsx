import React from "react";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import {
  Divider,
  Grid,
  List,
  ListItem,
  SxProps,
  Typography,
  styled,
} from "@mui/material";

import ScreenShot from "./Payment-screenshot";
import { downloadBlobFile, randomId } from "../../utils/helpers";
import useScreenshot from "@/hooks/useScreenshot";
import usePayments from "../Trips/Trip-context/usePayments";
import { useTripContext } from "../Trips/Trip-context/Trip-context";
import { Wrapper } from "./Payment-screenshot";
type IProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const sxDialogBox: SxProps = {
  "& .MuiDialog-container": {
    alignItems: "flex-start",
  },
};
const CList = styled(List)(() => ({
  "& > li": {
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: "small",
  },
  marginBottom: "0.875rem",
}));

const PaymentsShare: React.FC<IProps> = ({ isOpen, closeModal }) => {
  const [total, transactions, expenses] = usePayments();
  const { toPrice } = useTripContext();

  const handleDownloadImage = (e: React.MouseEvent) => {
    e.preventDefault();
    exportToCSV();
  };
  const exportToCSV = () => {
    const csvData = [];

    csvData.push("Names,Amount,Description");
    console.log(csvData);
    expenses.forEach((expense) => {
      csvData.push(
        `${expense.friend.name} paid,${expense.amount},${expense.reason ?? ""}`
      );

      csvData.push("\n");
    });

    transactions?.forEach((txn) => {
      csvData.push(
        `${txn.from_friend.name} gives ${txn.to_friend.name}: ${txn.amount}`
      );
      csvData.push("\n");
    });

    // Total amount
    csvData.push(`Total: ${toPrice(total ?? 0)}`);

    const csvContent = "data:text/csv;charset=utf-8," + csvData.join("\n");
    console.log(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "exported_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Dialog open={isOpen} onClose={closeModal} sx={sxDialogBox} scroll="paper">
      <DialogTitle>
        {
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <IconButton onClick={handleDownloadImage}>
              <DownloadIcon />
            </IconButton>
          </Box>
        }
      </DialogTitle>
      <DialogContent dividers={true}>
        <Box marginBottom="12px">
          <Wrapper>
            <Typography
              borderBottom={1}
              fontWeight="bold"
              borderColor="text.disabled"
            >
              Expenses
            </Typography>
            <CList dense>
              {expenses.map((expense) => (
                <>
                  <ListItem key={expense.id}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <div>
                        <Typography>{expense.friend.name} paid:</Typography>
                        {expense.reason && (
                          <Typography>
                            <small>({expense.reason})</small>
                          </Typography>
                        )}
                      </div>
                      <div>{toPrice(expense.amount)}</div>
                    </Grid>
                  </ListItem>
                  <Divider />
                </>
              ))}
              <Typography
                textAlign="right"
                width="100%"
                fontSize="small"
                mt="0.875rem"
              >
                Total: {toPrice(total ?? 0)}
              </Typography>
            </CList>
            <Typography
              borderBottom={1}
              fontWeight="bold"
              borderColor="text.disabled"
            >
              Final Txns
            </Typography>
            <CList dense>
              {transactions &&
                transactions.map((txn) => (
                  <ListItem key={txn.id}>
                    <Grid container justifyContent="space-between">
                      <span>
                        {txn.from_friend.name} gives {txn.to_friend.name}:
                      </span>{" "}
                      {toPrice(txn.amount)}
                    </Grid>
                  </ListItem>
                ))}
            </CList>
            <Typography
              textAlign="center"
              marginTop="0.875rem"
              fontSize="small"
            ></Typography>
          </Wrapper>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentsShare;
