import { Button, Space } from "antd";
import { ColumnsType } from "antd/es/table";

// ------------------- properties tabel -------------------

interface TabelDataType {
    id: number
    name: string
    type: string
}

export const PROPERTIES_TABEL_COLUMNS: ColumnsType<TabelDataType> = [
    {
        title: '№',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Property name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Button type="primary" ghost>Edite</Button>
                <Button type="primary" danger ghost> Delete</Button>
            </Space>
        ),
    },
];