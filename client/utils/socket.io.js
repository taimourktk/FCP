import io from "socket.io-client";
import { api } from './request';

const socket = (io(api));

export default socket;