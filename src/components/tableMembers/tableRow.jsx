import React, { useState } from 'react';
import {
  TableRow,
  TableCell,
  Grid,
  Avatar,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import avatar from '@/assets/Img/png/defaultUser.png';
import { useBoundStore } from '@/stores/index';
import { shallow } from 'zustand/shallow';
import useFormatText from '@/hooks/useFormatText';
import EditMember from '@/components/forms/EditMemberForm';
import './styles.css';

const columns = [
  { id: 'name', label: 'Name' },
  { id: 'project', label: 'Project' },
  { id: 'rol', label: 'Rol' },
  { id: 'leadOwner', label: 'Lead Owner' },
  { id: 'action', label: '' },
];

const TableRowComponent = ({
  isMobile,
  handleDeleteClick,
  row,
  isSelected,
  setAllMemberData,
  allMemberData,
}) => {
  const isItemSelected = isSelected(row?.name);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const isExpanded = isMobile && isItemSelected;
  const { ChangeStateModal, ChangeTitleModal, ChangeContentModal } =
    useBoundStore((state) => state, shallow);

  const openModal = (row) => {
    ChangeTitleModal('');
    ChangeContentModal(
      <EditMember
        row={row}
        setAllMemberData={setAllMemberData}
        allMemberData={allMemberData}
      />
    );
    ChangeStateModal(true);
  };

  return (
    <React.Fragment key={row._id._id}>
      <TableRow hover={!isMobile}>
        {!isMobile && (
          <TableCell className="checkbox-contact">
            <Checkbox sx={{ color: 'lightgray' }} />
          </TableCell>
        )}

        {columns.length > 0 &&
          row &&
          columns.map((column) => {
            let cellContent = row._id[column.id];

            return (
              <TableCell
                key={column.id}
                align="left"
                style={{
                  fontWeight: 'bold',
                  width: 'auto',
                  fontSize: '14px',
                  padding: !isMobile ? '0px' : '12px',
                  backgroundColor:
                    column.id === 'lead_status' ? 'cyan' : 'inherit',
                }}
              >
                {column.id === 'action' && !isMobile && (
                  <div style={{ marginTop: '20%' }}>
                    <Tooltip title="Delete member">
                      <DeleteIcon
                        style={{
                          marginLeft: '24px',
                          cursor: 'pointer',
                          color: deleteClicked ? 'blue' : 'inherit',
                          transition: 'color 0.2s ease-in-out',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteClicked(true);
                          setTimeout(() => {
                            setDeleteClicked(false);
                            handleDeleteClick(row);
                          }, 200);
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Edit member">
                      <EditIcon
                        style={{
                          cursor: 'pointer',
                          marginLeft: '10px',
                          color: editClicked ? 'blue' : 'inherit',
                          transition: 'color 0.2s ease-in-out',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditClicked(true);
                          setTimeout(() => {
                            setEditClicked(false);
                            openModal(row);
                          }, 200);
                        }}
                      />
                    </Tooltip>
                  </div>
                )}
                {!isMobile &&
                (column.id === 'name' || column.id === 'leadOwner') ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {column.id === 'name' &&
                      (row._id ? (
                        <Avatar
                          sx={{
                            borderRadius: '50%',
                            bgcolor: `${row && row._id?.colorbg}`,
                            color: `${row && row._id?.colorText}`,
                          }}
                        >
                          {row._id.name && row._id.name.split(' ')[0]?.[0]}
                          {row._id.name &&
                            row._id.name.split(' ').length > 1 &&
                            row._id.name.split(' ')[1]?.[0]}
                        </Avatar>
                      ) : (
                        <CircularProgress
                          style={{ color: '#C02327' }}
                          sx={{ m: 2 }}
                          size="32px"
                        />
                      ))}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: '10px',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        {column.id === 'name' ? (
                          useFormatText(row._id.name)
                        ) : (
                          <Tooltip title={row?.leadOwner}>
                            <div style={{ marginLeft: 20 }}>
                              <Avatar
                                sx={{
                                  borderRadius: '50%',
                                  bgcolor: 'lightgray',
                                  color: 'white',
                                  border: '1px solid darkgray',
                                }}
                              >
                                {row.leadOwner &&
                                  row.leadOwner.split(' ')[0]?.[0]}
                                {row.leadOwner &&
                                  row.leadOwner.split(' ').length > 0 &&
                                  row.leadOwner.split(' ')[1]?.[0]}
                              </Avatar>
                            </div>
                          </Tooltip>
                        )}
                      </div>
                      {column.id === 'name' && (
                        <div style={{ flex: 1, color: 'gray' }}>
                          {row._id.email}
                        </div>
                      )}
                    </div>
                  </div>
                ) : !isMobile &&
                  column.id !== 'photo' &&
                  column.id !== 'email' ? (
                  column.id === 'rol' ? (
                    <span style={{ marginLeft: 5 }}>{row.rolToProject}</span>
                  ) : (
                    <span style={{ marginLeft: 10 }}>
                      {useFormatText(cellContent)}
                    </span>
                  )
                ) : (
                  column.id === 'name' && ''
                )}
              </TableCell>
            );
          })}
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell colSpan={6}>
            <Grid container spacing={1}>
              {columns.map((column, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Typography
                    variant="body2"
                    component="div"
                    style={{
                      textAlign: 'center',
                      marginRight: '20%',
                      fontWeight: 'normal',
                    }}
                  >
                    <strong>{column.label !== 'Name' && column.label} </strong>
                    {column.label !== 'Name' && column.id !== 'action' ? (
                      <React.Fragment>
                        {column.id === 'photo' ? (
                          <img src={avatar} width="56px" alt="Photo" />
                        ) : column.label !== 'Rol' ? (
                          <span style={{ fontWeight: 'normal' }}>
                            {': ' + row[column.id]}
                          </span>
                        ) : (
                          <span style={{ fontWeight: 'normal' }}>
                            {': ' + row.rolToProject}
                          </span>
                        )}
                      </React.Fragment>
                    ) : (
                      ''
                    )}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
};

export default TableRowComponent;
