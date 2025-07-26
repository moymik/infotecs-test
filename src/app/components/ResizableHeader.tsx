import type {ResizableProps} from 'react-resizable';
import {Resizable} from 'react-resizable';
import 'react-resizable/css/styles.css';

type ResizableHeaderProps = {
    onResize: ResizableProps['onResize'];
    width: number;
} & Omit<React.HTMLAttributes<HTMLTableCellElement>, 'onResize'>;

export default function ResizableHeader({onResize, width, children, ...rest}: ResizableHeaderProps) {
    if (!width) {
        return <th {...rest}>{children}</th>;
    }
    return (
        <Resizable
            width={width}
            height={0}
            onResize={onResize}
            draggableOpts={{enableUserSelectHack: false}}
        >
            <th {...rest} style={{width: `${width}px`}}>
                {children}
            </th>
        </Resizable>
    );
}
