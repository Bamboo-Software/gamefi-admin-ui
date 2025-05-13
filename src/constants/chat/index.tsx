import {
  FaUserFriends,
  FaCommentDots,
  FaRobot,
  FaUser,
  FaInfoCircle,
  FaEnvelope,
  FaClock,
  FaEyeSlash,
  FaCogs,
  FaBellSlash,
  FaListAlt,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';
import { MoreHorizontal } from 'lucide-react';
import { CellPropsChat } from '@/components/pages/chat/chat-cell';
export const CHAT_TYPE_OPTIONS = [
    { label: 'Community', value: 'community' },
    { label: 'Private', value: 'private' },
    { label: 'AI', value: 'ai' },
  ];
  export const CHAT_STATUS_OPTIONS = [
    { label: 'Active', value: 'active' },
    { label: 'Archived', value: 'archived' },
    { label: 'Deleted', value: 'deleted' },
  ];
  export const TABLE_HEADERS_CHAT = [
    {
      columnKey: 'name',
      title: 'Chat Name',
      icon: <FaCommentDots className="inline w-4 h-4 mr-1 text-purple-600" />,
    },
    {
      columnKey: 'description',
      title: 'Description',
      icon: <FaInfoCircle className="inline w-4 h-4 mr-1 text-rose-500" />,
    },
    {
      columnKey: 'type',
      title: 'Chat Type',
      icon: <FaCogs className="inline w-4 h-4 mr-1 text-blue-600" />,
    },
    {
      columnKey: 'status',
      title: 'Status',
      icon: <FaListAlt className="inline w-4 h-4 mr-1 text-green-600" />,
    },
    {
      columnKey: 'createdById',
      title: 'Created By',
      icon: <FaUser className="inline w-4 h-4 mr-1 text-gray-600" />,
    },
    {
      columnKey: 'participantIds',
      title: 'Participants',
      icon: <FaUserFriends className="inline w-4 h-4 mr-1 text-orange-500" />,
    },
    {
      columnKey: 'botId',
      title: 'AI Bot',
      icon: <FaRobot className="inline w-4 h-4 mr-1 text-teal-600" />,
    },
    {
      columnKey: 'lastMessage',
      title: 'Last Message',
      icon: <FaEnvelope className="inline w-4 h-4 mr-1 text-indigo-600" />,
    },
    {
      columnKey: 'lastMessageAt',
      title: 'Last Message At',
      icon: <FaClock className="inline w-4 h-4 mr-1 text-gray-500" />,
    },
    {
      columnKey: 'isRead',
      title: 'Is Read',
      icon: <FaEyeSlash className="inline w-4 h-4 mr-1 text-pink-500" />,
    },
    {
      columnKey: 'unreadCount',
      title: 'Unread Count',
      icon: <FaBellSlash className="inline w-4 h-4 mr-1 text-yellow-600" />,
    },
    {
      columnKey: 'actions',
      title: 'Actions',
      icon: <MoreHorizontal className="inline w-4 h-4 mr-1 text-gray-500" />,
    },
  ];
  export const getChatCellConfigs = (
    chat: Chat,
    utils: {
      handleDelete: (chat: Chat) => void;
      setCurrent: (chat: Chat) => void;
      setEditOpen: (open: boolean) => void;
      setIsViewOpen: (open: boolean) => void;
      getStatusColor: (status: string) => string;
      formatDate: (date?: string | Date) => string;
    }
  ): CellPropsChat[] => {
    const { handleDelete, setCurrent, setEditOpen, setIsViewOpen, getStatusColor, formatDate } = utils;
  
    return [
      {
        type: 'name',
        value: chat.name ?? 'N/A',
      },
      {
        type: 'description',
        value: chat.description ?? '',
      },
      {
        type: 'type',
        value: chat.type,
      },
      {
        type: 'status',
        value: chat.status,
        color: getStatusColor(chat.status),
      },
      {
        type: 'createdById',
        value: chat.createdBy?.username ?? chat.createdById ?? 'Unknown',
      },
      {
        type: 'participantIds',
        value: chat.participants?.length ?? 0,
      },
      {
        type: 'botId',
        value: chat.bot?.name ?? chat.botId ?? 'None',
      },
      {
        type: 'lastMessage',
        value: chat.lastMessage ?? '',
      },
      {
        type: 'lastMessageAt',
        value: formatDate(chat.lastMessageAt),
      },
      {
        type: 'isRead',
        value: chat.isRead,
        children: chat.isRead ? (
          <FaCheckCircle className="text-green-500 inline w-4 h-4" />
        ) : (
          <FaTimesCircle className="text-red-500 inline w-4 h-4" />
        ),
      },
      {
        type: 'unreadCount',
        value: String(chat.unreadCount ?? 0),
      },
      {
        type: 'actions',
        onEdit: () => {
          setCurrent(chat);
          setEditOpen(true);
        },
        onView: () => {
          setCurrent(chat);
          setIsViewOpen(true);
        },
        onDelete: () => handleDelete(chat),
      },
    ];
  };