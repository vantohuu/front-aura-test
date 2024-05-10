'use client'
import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { Table, Space } from "antd";
import { Button, Modal } from 'antd';

import axios from 'axios';



export default function Admin() {
  const [dataSource, setDataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState()
  const showModal = (record) => {
    setData(record);
    // console.log(record)
    setIsModalOpen(true);
  };

  const handleOk = async (id) => {
    await axios.delete(process.env.NEXT_PUBLIC_BE_HOST + '/booking/delete', { data: { id } })
      .then(response => {
        // s(response.data)
      }
      )
      .catch(error => console.log(error));
      setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_BE_HOST + '/booking/get-all')
      .then(response => {
        setDataSource(response.data.data)
     }
      )
      .catch(error => console.log(error));
  }, [isModalOpen]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    }, {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Restaurant ID',
      dataIndex: 'restaurantId',
      key: 'restaurantId',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => showModal(record)}>
          <a>Delete</a>
          </Button>
          <Modal  title='Delete'  open={isModalOpen}  onOk={() => {handleOk(data.id)}} onCancel={handleCancel}>
            <p>Bạn có muốn xóa nó không?</p>
          </Modal>
        </Space>
      ),
    }
  ];

  return (
    <div className="flex flex-col items-center w-full h-full overflow-scroll min-h-screen bg-white  py-3">
      <h1 className="font-bold my-3">BOOKING</h1>
      <Table className="p-2 w-screen" dataSource={dataSource} columns={columns} />
    </div>
  );
}
