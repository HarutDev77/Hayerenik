import { Button, Table } from "antd"
import classes from './Properties.module.scss'
import { PROPERTIES_TABEL_COLUMNS } from "@/constants/tables"


const PropertiesPage = () => {

    const data = [
        { id: 1, name: 'testing 1', type: 'testing 1' },
        { id: 2, name: 'testing 2', type: 'testing 2' },
        { id: 3, name: 'testing 3', type: 'testing 3' },
        { id: 4, name: 'testing 4', type: 'testing 4' },
        { id: 5, name: 'testing 4', type: 'testing 5' },
    ]

    return (
        <div className={classes.properties}>
            <h2 className={classes.properties_header}>Properties</h2>
            <Table
                className={classes.properties_tabel}
                columns={PROPERTIES_TABEL_COLUMNS}
                dataSource={data}
                pagination={{ position: ['topLeft', 'bottomLeft'], }}
            />
            <Button type="primary">Add new property</Button>
        </div>
    )
}

export default PropertiesPage