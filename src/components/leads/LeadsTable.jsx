import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Users, Mail, Eye, MousePointer, Clock } from "lucide-react";
import StatusBadge from "./StatusBadge";
import MessageTypeBadge from "./MessageTypeBadge";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";

// Global styles for MUI portals (menus, popovers, etc.)
const globalStyles = (
  <GlobalStyles
    styles={{
      ".MuiPopover-root .MuiPaper-root": {
        backgroundColor: "#353640 !important", // Direct color instead of CSS var
        color: "#fbfbfb !important",
        border: "1px solid rgba(255, 255, 255, 0.1) !important",
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3) !important",
        backgroundImage: "none !important",
      },
      ".MuiMenu-paper": {
        backgroundColor: "#353640 !important",
        color: "#fbfbfb !important",
        border: "1px solid rgba(255, 255, 255, 0.1) !important",
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3) !important",
        backgroundImage: "none !important",
      },
      ".MuiMenuItem-root": {
        color: "#fbfbfb !important",
        "&:hover": {
          backgroundColor: "#464752 !important",
        },
      },
      ".MuiBackdrop-root": {
        backgroundColor: "rgba(0, 0, 0, 0.8) !important",
      },
      ".MuiDataGrid-panel": {
        backgroundColor: "#353640 !important",
        color: "#fbfbfb !important",
        border: "1px solid rgba(255, 255, 255, 0.1) !important",
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3) !important",
        backgroundImage: "none !important",
      },
      ".MuiDataGrid-panelHeader": {
        backgroundColor: "#353640 !important",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1) !important",
      },
      ".MuiDataGrid-panelContent": {
        backgroundColor: "#353640 !important",
      },
      ".MuiDataGrid-panelWrapper": {
        backgroundColor: "#353640 !important",
        backgroundImage: "none !important",
      },
      ".MuiDataGrid-filterForm": {
        backgroundColor: "#353640 !important",
      },
      ".MuiDataGrid-menuList": {
        backgroundColor: "#353640 !important",
        padding: "4px !important",
      },
      ".MuiPaper-root": {
        backgroundImage: "none !important",
      },
    }}
  />
);

// Create a custom MUI theme that matches the project theme
const customTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#24242a",
      paper: "#353640",
    },
    text: {
      primary: "#fbfbfb",
      secondary: "#b4b4bd",
    },
    divider: "rgba(255, 255, 255, 0.1)",
  },
  typography: {
    fontFamily: "inherit",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#353640",
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundColor: "#353640",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)",
          backgroundImage: "none",
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
      },
    },
  },
});

// Styled DataGrid that respects the current theme
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: "none",
  backgroundColor: "#353640",
  color: "#fbfbfb",
  fontFamily: "inherit",

  // Cell styling
  "& .MuiDataGrid-cell": {
    borderColor: "rgba(255, 255, 255, 0.1)",
    padding: "16px",
    color: "#fbfbfb",
    fontSize: "0.875rem",
  },

  // Column header styling
  "& .MuiDataGrid-columnHeaders": {
    borderColor: "rgba(255, 255, 255, 0.1)",
    backgroundColor: "rgba(70, 71, 82, 0.5)",
    color: "#fbfbfb",
    fontWeight: 600,
    borderRadius: 0,
  },
  "& .MuiDataGrid-columnHeader": {
    padding: "16px",
    "&:focus, &:focus-within": {
      outline: "none",
    },
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 600,
    color: "#fbfbfb",
  },

  // Row styling
  "& .MuiDataGrid-row": {
    borderColor: "rgba(255, 255, 255, 0.1)",
    backgroundColor: "#353640",
    "&:hover": {
      backgroundColor: "rgba(70, 71, 82, 0.5)",
    },
    "&.Mui-selected": {
      backgroundColor: "rgba(70, 71, 82, 0.3)",
      "&:hover": {
        backgroundColor: "rgba(70, 71, 82, 0.5)",
      },
    },
  },

  // Footer styling
  "& .MuiDataGrid-footerContainer": {
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    backgroundColor: "#353640",
    color: "#fbfbfb",
    minHeight: "56px",
  },

  // Pagination styling
  "& .MuiTablePagination-root": {
    color: "#fbfbfb",
  },
  "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
    color: "#b4b4bd",
    fontSize: "0.875rem",
  },
  "& .MuiTablePagination-select": {
    color: "#fbfbfb",
    backgroundColor: "#24242a",
    borderRadius: "0.375rem",
    padding: "4px 8px",
    "&:hover": {
      backgroundColor: "#464752",
    },
  },
  "& .MuiTablePagination-actions": {
    color: "#fbfbfb",
  },

  // Icon button styling
  "& .MuiIconButton-root": {
    color: "#fbfbfb",
    "&:hover": {
      backgroundColor: "rgba(70, 71, 82, 0.5)",
    },
    "&.Mui-disabled": {
      color: "#b4b4bd",
      opacity: 0.5,
    },
  },

  // Menu and filter styling
  "& .MuiDataGrid-menu": {
    backgroundColor: "#353640",
    color: "#fbfbfb",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
  },
  "& .MuiDataGrid-menuList": {
    backgroundColor: "#353640",
    padding: "4px",
  },
  "& .MuiMenuItem-root": {
    color: "#fbfbfb",
    borderRadius: "4px",
    margin: "2px 0",
    "&:hover": {
      backgroundColor: "#464752",
    },
  },

  // Panel styling (for filters)
  "& .MuiDataGrid-panel": {
    backgroundColor: "#353640",
    color: "#fbfbfb",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
    backgroundImage: "none !important",
  },
  "& .MuiDataGrid-panelHeader": {
    backgroundColor: "#353640",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    padding: "16px",
  },
  "& .MuiDataGrid-panelContent": {
    backgroundColor: "#353640",
    padding: "16px",
  },
  "& .MuiDataGrid-panelWrapper": {
    backgroundColor: "#353640 !important",
    backgroundImage: "none !important",
  },
  "& .MuiDataGrid-filterForm": {
    backgroundColor: "#353640",
    padding: "8px",
  },
  "& .MuiDataGrid-filterFormDeleteIcon": {
    color: "#b4b4bd",
  },
  "& .MuiDataGrid-filterFormColumnInput, & .MuiDataGrid-filterFormOperatorInput, & .MuiDataGrid-filterFormValueInput":
    {
      backgroundColor: "#24242a",
      borderRadius: "6px",
    },

  // Input styling in filters
  "& .MuiInput-root": {
    color: "#fbfbfb",
    backgroundColor: "#24242a",
    padding: "4px 8px",
    borderRadius: "6px",
    "&:before": {
      borderBottomColor: "rgba(255, 255, 255, 0.1)",
    },
    "&:hover:before": {
      borderBottomColor: "#fbfbfb",
    },
    "&:after": {
      borderBottomColor: "#8b5cf6",
    },
  },
  "& .MuiInputBase-input": {
    color: "#fbfbfb",
  },
  "& .MuiInputLabel-root": {
    color: "#b4b4bd",
    "&.Mui-focused": {
      color: "#8b5cf6",
    },
  },
  "& .MuiSelect-select": {
    color: "#fbfbfb",
    backgroundColor: "#24242a",
  },
  "& .MuiSelect-icon": {
    color: "#b4b4bd",
  },

  // Paper (dropdown) styling
  "& .MuiPaper-root": {
    backgroundColor: "#353640",
    color: "#fbfbfb",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
    backgroundImage: "none",
  },

  // Toolbar styling
  "& .MuiDataGrid-toolbarContainer": {
    padding: "16px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    backgroundColor: "#353640",
  },

  // Overlay styling (loading, no rows)
  "& .MuiDataGrid-overlay": {
    backgroundColor: "rgba(36, 36, 42, 0.9)",
    color: "#fbfbfb",
  },

  // Scrollbar styling
  "& .MuiDataGrid-virtualScroller": {
    "&::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#464752",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(180, 180, 189, 0.5)",
      borderRadius: "4px",
      "&:hover": {
        backgroundColor: "#b4b4bd",
      },
    },
  },

  // Column separator
  "& .MuiDataGrid-columnSeparator": {
    color: "rgba(255, 255, 255, 0.1)",
  },

  // Sort icon
  "& .MuiDataGrid-sortIcon": {
    color: "#fbfbfb",
  },

  // Filter icon
  "& .MuiDataGrid-filterIcon": {
    color: "#fbfbfb",
  },
}));

const LeadsTable = ({ leads }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatus = (lead) => {
    if (lead.is_bounced) return "bounced";
    if (lead.is_unsubscribed) return "unsubscribed";
    if (lead.reply_time) return "replied";
    if (lead.click_time) return "clicked";
    if (lead.open_time) return "opened";
    if (lead.sent_time) return "sent";
    return "pending";
  };

  const getLatestActivity = (lead) => {
    if (lead.reply_time) return { type: "reply", time: lead.reply_time };
    if (lead.click_time) return { type: "click", time: lead.click_time };
    if (lead.open_time) return { type: "open", time: lead.open_time };
    if (lead.sent_time) return { type: "sent", time: lead.sent_time };
    return null;
  };

  // Transform leads data and add computed fields
  const rows = leads.map((lead, index) => ({
    id: lead.stats_id || index,
    ...lead,
    status: getStatus(lead),
    latestActivity: getLatestActivity(lead),
  }));

  const columns = [
    {
      field: "lead_name",
      headerName: "Lead",
      flex: 1,
      minWidth: 250,
      renderCell: (params) => (
        <div className="space-y-1 py-2">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            <span className="font-medium text-foreground">
              {params.row.lead_name}
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            {params.row.lead_email}
          </div>
          {params.row.lead_category && (
            <div className="text-xs text-muted-foreground">
              Category: {params.row.lead_category}
            </div>
          )}
        </div>
      ),
    },
    {
      field: "email_subject",
      headerName: "Email Subject",
      flex: 1,
      minWidth: 250,
      renderCell: (params) => (
        <div className="max-w-xs">
          <div
            className="font-medium text-foreground truncate"
            title={params.row.email_subject}
          >
            {params.row.email_subject}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            ID: {params.row.email_campaign_seq_id}
          </div>
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => <StatusBadge status={params.value} />,
      type: "singleSelect",
      valueOptions: [
        "bounced",
        "unsubscribed",
        "replied",
        "clicked",
        "opened",
        "sent",
        "pending",
      ],
    },
    {
      field: "sequence_number",
      headerName: "Sequence",
      width: 180,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-primary">
              {params.value}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            Sequence {params.value}
          </span>
        </div>
      ),
      type: "number",
    },
    {
      field: "engagement",
      headerName: "Engagement",
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4 text-accent-foreground" />
            <span className="text-sm font-medium">{params.row.open_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <MousePointer className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">
              {params.row.click_count}
            </span>
          </div>
        </div>
      ),
    },
    {
      field: "latestActivity",
      headerName: "Latest Activity",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        const activity = params.value;
        return activity ? (
          <div className="space-y-2">
            <MessageTypeBadge type={activity.type} />
            <div className="text-xs text-muted-foreground">
              {formatDate(activity.time)}
            </div>
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">No activity</span>
        );
      },
    },
    {
      field: "sent_time",
      headerName: "Sent",
      width: 200,
      type: "dateTime",
      valueGetter: (params) => (params ? new Date(params) : null),
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {formatDate(params.row.sent_time)}
          </span>
        </div>
      ),
    },
  ];

  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Users className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No Leads Found
        </h3>
        <p className="text-muted-foreground text-center max-w-md">
          There are no leads available for this campaign yet. Leads will appear
          here once your campaign starts generating engagement.
        </p>
      </div>
    );
  };

  return (
    <ThemeProvider theme={customTheme}>
      {globalStyles}
      <div style={{ width: "100%" }}>
        <StyledDataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          disableRowSelectionOnClick
          autoHeight
          getRowHeight={() => "auto"}
          sx={{
            "& .MuiDataGrid-cell": {
              py: 2,
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
};

export default LeadsTable;
