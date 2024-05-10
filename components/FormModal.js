'use client'
import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio , notification} from "antd";

import axios from 'axios';

const CreateForm = (props) => {
    const { visible, setVisible, onCreate, restaurantId,api } = props;
    const [form] = Form.useForm();
    const openNotificationWithIcon = (type, message) => {
      api[type]({
        message: message,
      });
    };
    const handleCreate = () => {
        form
            .validateFields()
            .then(async(values) => {
                console.log(values)
                console.log(restaurantId)
                await axios.post(process.env.NEXT_PUBLIC_BE_HOST + '/booking/create', { ...values, restaurantId})
                    .then(response => {
                        if (response.data.success == true) openNotificationWithIcon('success', "Success booking!!!");
                        else openNotificationWithIcon('error', "Error booking!!!")
                        console.log(response.data)
                        setVisible(false);
                    }
                    )
                    .catch(error => openNotificationWithIcon('error',error));
                // setIsModalOpen(false);
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };
    return (
        
        <Modal
            open={visible}
            title="Booking a table"
            okText="Ok"
            onCancel={() => {
                setVisible(false);
            }}
            onOk={handleCreate}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        { required: true, message: "Please input your name!" }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Please input your email!" }
                    ]}
                >
                    <Input type="email" />
                </Form.Item>
                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                        { required: true, message: "Please input your phone!" }
                    ]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="Time"
                    name="time"
                    rules={[
                        { required: true, message: "Please input your time!" }
                    ]}
                >
                    <Input type="datetime-local" />
                </Form.Item>

                <Form.Item name="note" label="Note">
                    <Input type="textarea" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export const FormModal = ({ onChange, restaurantId}) => {
    // const { onChange } = props;
    const [api, contextHolder] = notification.useNotification();

    const [visible, setVisible] = useState(false);

    const onCreate = (values) => {
        onChange(values);
        setVisible(false);
    };

    return (
        <div>
            {contextHolder}
            <button className='w-[180px] my-5 h-[50px] font-bold rounded-full hover:bg-red-700 bg-red-500  text-white text-center'
                onClick={() => {
                    setVisible(true);
                }}
            >
                BOOK A TABLE
            </button>
            <CreateForm
                api={api}
                restaurantId={restaurantId}
                visible={visible}
                setVisible={setVisible}
                onCreate={onCreate}
            />
        </div>
    );
};