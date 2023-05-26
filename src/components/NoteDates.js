import { Space } from 'antd';

const NoteDates = ({note}) => {

    return (
        <div id="note-dates">
        <Space>
          <span>Updated:&nbsp;{new Date(note.updatedAt).toLocaleString()}</span>
          &emsp;
          <span>Created:&nbsp;{new Date(note.createdAt).toLocaleString()}</span>
        </Space>
        <Space></Space>
      </div>
    )
}

export default NoteDates;