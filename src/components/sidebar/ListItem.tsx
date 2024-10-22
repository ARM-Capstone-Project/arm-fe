// src/components/ListItem.tsx

import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'

interface ListItemProps {
  to: string
  icon: IconDefinition
  text: string
  isOpen: boolean
}

const ListItem: React.FC<ListItemProps> = ({ to, icon, text, isOpen }) => {
  return (
    <li className="border-b border-gray-700">
      <Link to={to} className="flex items-center p-4 hover:bg-gray-700">
        {icon && <FontAwesomeIcon id={`icon-${icon}`} icon={icon} className="mr-3" />}
        <span className={`${isOpen ? 'inline' : 'hidden'}`}>{text}</span>
      </Link>
    </li>
  )
}

export default ListItem
