import {  TrashIcon, } from 'lucide-react';
import {
    FaTasks,
  } from 'react-icons/fa';
  import {
    FileText,
    Tag,
    CircleCheck,
    SlidersHorizontal,
    Clock,
    MoreHorizontal,
  } from 'lucide-react';
import { Season } from '@/interfaces/seasons';
import { CellPropsSeason } from '@/components/pages/seasons/season-cell';
import Image from '@/components/image';
import fallbackImg from '@/assets/images/image-placeholder.svg'
export const TABLE_HEADERS_SEASON = [
    {
      columnKey: 'name',
      title: 'Name',
      icon: <FaTasks className="inline w-4 h-4 mr-1 text-purple-600" />,
    },
    {
      columnKey: 'description',
      title: 'Description',
      icon: <FileText className="inline w-4 h-4 mr-1 text-rose-500" />,
    },
    {
      columnKey: 'imageURL',
      title: 'Image',
      icon: <Tag className="inline w-4 h-4 mr-1 text-amber-600" />,
    },
    {
      columnKey: 'requireNFT',
      title: 'Required NFT',
      icon: <CircleCheck className="inline w-4 h-4 mr-1 text-green-600" />,
    },
    {
      columnKey: 'game',
      title: 'Game',
      icon: <SlidersHorizontal className="inline w-4 h-4 mr-1 text-blue-600" />,
    },
    {
      columnKey: 'time',
      title: 'Time',
      icon: <Clock className="inline w-4 h-4 mr-1 text-gray-500" />,
    },
    {
      columnKey: 'createdAt',
      title: 'Created At',
      icon: <Clock className="inline w-4 h-4 mr-1 text-gray-500" />,
    },
    { columnKey: 'deletedAt', title: 'Deleted At', icon: <TrashIcon className="inline w-4 h-4 mr-1 text-gray-500" /> },
    {
      columnKey: 'actions',
      title: 'Actions',
      icon: <MoreHorizontal className="inline w-4 h-4 mr-1 text-gray-500" />,
    },
  ];

  export const getSeasonCellConfigs = (
    season: Season,
    utils: {
      handleDelete: (season: Season) => void;
      setCurrent: (season: Season) => void;
      setEditOpen: (open: boolean) => void;
      setIsViewOpen: (open: boolean) => void;
      getStatusColor: (active: boolean) => string;
      formatDate: (date?: string) => string;
    }
  ): CellPropsSeason[] => {
    const { handleDelete, setCurrent, setEditOpen, getStatusColor, formatDate, setIsViewOpen } = utils;
    return [
      {
        type: 'name',
        children: season.name,
      },
      {
        type: 'description',
        value: season.description,
      },
      {
        type: 'imageURL',
        children: <Image className='rounded-lg' fallbackSrc={fallbackImg} width={60}  src={season.imageUrl || fallbackImg} alt={season.name}/>,
      },
      {
        type: 'active',
        value: season.isActive,
        getStatusColor,
      },
      {
        type: 'game',
        children: <p>{season?.game?.title}</p> ,
      },
      {
        type: 'time',
        children: <p>{formatDate(season.startDate)} - {formatDate(season.endDate)}</p> ,
      },
      {
        type: 'createdAt',
        value: formatDate(season.createdAt),
      },
       
      { type: "deletedAt", value: season.deletedAt ? formatDate(season.deletedAt) : '' },
      {
        type: 'actions',
        value: season.isActive,
        onEdit: () => {
          setCurrent(season);
          setEditOpen(true);
        },
        onView: () => {
          setCurrent(season);
          setIsViewOpen(true);
        },
        onDelete: () => handleDelete(season),
      },
    ];
  };
  