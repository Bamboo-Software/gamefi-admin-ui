import {  BrainCircuit, Rocket, Sword, Puzzle, TrashIcon, } from 'lucide-react';
import {
    FaTasks,
    FaLink,
  } from 'react-icons/fa';
  import {
    FileText,
    Tag,
    CircleCheck,
    SlidersHorizontal,
    Package2,
    Award,
    Clock,
    MoreHorizontal,
  } from 'lucide-react';
import { GameCategoryEnum } from '@/enums/game.enum';
import CategoryCol from '@/components/pages/games/game-category';
import { CellPropsGame } from '@/components/pages/games/game-cell';
export const GAME_CATEGORY_VISUALS: Record<
  GameCategoryEnum,
  {
    icon: React.ReactNode;
    text: string;
    color: string;
  }
> = {
  [GameCategoryEnum.PUZZLE]: {
    icon: <Puzzle className="w-4 h-4 text-purple-500" />,
    text: 'Puzzle',
    color: 'text-purple-600',
  },
  [GameCategoryEnum.ACTION]: {
    icon: <Sword className="w-4 h-4 text-red-500" />,
    text: 'Action',
    color: 'text-red-600',
  },
  [GameCategoryEnum.ARCADE]: {
    icon: <Rocket className="w-4 h-4 text-orange-500" />,
    text: 'Arcade',
    color: 'text-orange-600',
  },
  [GameCategoryEnum.STRATEGY]: {
    icon: <BrainCircuit className="w-4 h-4 text-blue-500" />,
    text: 'Strategy',
    color: 'text-blue-600',
  },
};
export const DIFFICULTY_OPTIONS = [
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];

export const TABLE_HEADERS_GAME = [
    {
      columnKey: 'title',
      title: 'Game Title',
      icon: <FaTasks className="inline w-4 h-4 mr-1 text-purple-600" />,
    },
    {
      columnKey: 'description',
      title: 'Description',
      icon: <FileText className="inline w-4 h-4 mr-1 text-rose-500" />,
    },
    {
      columnKey: 'category',
      title: 'Category',
      icon: <Tag className="inline w-4 h-4 mr-1 text-amber-600" />,
    },
    {
      columnKey: 'active',
      title: 'Active Status',
      icon: <CircleCheck className="inline w-4 h-4 mr-1 text-green-600" />,
    },
    {
      columnKey: 'difficultyLevels',
      title: 'Difficulty Levels',
      icon: <SlidersHorizontal className="inline w-4 h-4 mr-1 text-blue-600" />,
    },
    {
      columnKey: 'version',
      title: 'Version',
      icon: <Package2 className="inline w-4 h-4 mr-1 text-gray-600" />,
    },
    {
      columnKey: 'url',
      title: 'Game URL',
      icon: <FaLink className="inline w-4 h-4 mr-1 text-sky-600" />,
    },
    {
      columnKey: 'requiredPoints',
      title: 'Required Points',
      icon: <Award className="inline w-4 h-4 mr-1 text-yellow-500" />,
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

  export const CATEGORY_OPTIONS = [
    { value: GameCategoryEnum.PUZZLE, label: 'Puzzle' },
    { value: GameCategoryEnum.ACTION, label: 'Action' },
    { value: GameCategoryEnum.ARCADE, label: 'Arcade' },
    { value: GameCategoryEnum.STRATEGY, label: 'Strategy' },
];
export const PRIZE_TYPE_OPTIONS = [
  { label: 'Point', value: 'POINT' },
  { label: 'Token', value: 'TOKEN' },
];
export const PRIZE_TYPE_LOTTERY_OPTIONS = [
  { label: 'Point', value: 'POINT' },
  { label: 'Token', value: 'TOKEN' },
  { label: 'None', value: 'NONE' },
  { label: 'Extra Spin', value: 'EXTRA_SPIN' },
  { label: 'Double Points 24h', value: 'DOUBLE_POINTS_24H' },
];
export const BLOCKCHAIN_OPTIONS = [
  { label: "Solana", value: "solana" },
  { label: "Ethereum", value: "ethereum" },
  { label: "BNB Chain", value: "bsc" },
  { label: "Avalanche", value: "avalanche" },
];
export const CRYPTO_OPTIONS = [
  { label: "JFOX", value: "JFOX" },
  { label: "SOL", value: "SOL" },
  { label: "USDT", value: "USDT" },
  { label: "USDC", value: "USDC" },
];

  export const getGameCellConfigs = (
    game: Game,
    utils: {
      handleDelete: (game: Game) => void;
      setCurrent: (game: Game) => void;
      setEditOpen: (open: boolean) => void;
      setIsViewOpen: (open: boolean) => void;
      getStatusColor: (active: boolean) => string;
      formatDate: (date?: string) => string;
    }
  ): CellPropsGame[] => {
    const { handleDelete, setCurrent, setEditOpen, getStatusColor, formatDate, setIsViewOpen } = utils;
    return [
      {
        type: 'title',
        children: game.title,
        createdAt: formatDate(game.createdAt),
      },
      {
        type: 'description',
        value: game.description,
      },
      {
        type: 'category',
        children: <CategoryCol type={game.category} />,
      },
      {
        type: 'active',
        value: game.active,
        getStatusColor,
      },
      {
        type: 'difficultyLevels',
        value: game.difficultyLevels?.join(', ') || '',
      },
      {
        type: 'version',
        value: game.version ?? 'N/A',
      },
      {
        type: 'url',
        value: game.url,
        children: (
          <a href={game.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            Visit
          </a>
        ),
      },
      {
        type: 'requiredPoints',
        value: Math.floor(Number(game.requiredPoints ?? 0)).toLocaleString('en-US'),
      },
      {
        type: 'createdAt',
        value: formatDate(game.createdAt),
      },
      { type: "deletedAt", value: game.deletedAt ? formatDate(game.deletedAt) : '' },
      {
        type: 'actions',
        onEdit: () => {
          setCurrent(game);
          setEditOpen(true);
        },
        onView: () => {
          setCurrent(game);
          setIsViewOpen(true);
        },
        onDelete: () => handleDelete(game),
      },
    ];
  };
  