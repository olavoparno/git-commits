import React from 'react'
import ReactTable from 'react-table'

import 'react-table/react-table.css'

const Table = ({ data }: any) => {
  const defaultAvatar = 'https://camo.githubusercontent.com/379e236902a965f080ec554e09338694394be47f/68747470733a2f2f302e67726176617461722e636f6d2f6176617461722f63623533613133633436343665303463613239646230316538623265613161663f643d68747470732533412532462532466769746875622e6769746875626173736574732e636f6d253246696d6167657325324667726176617461727325324667726176617461722d757365722d3432302e706e6726723d6726733d3430'

  const columns = [
    {
      Header: '',
      accessor: 'author.avatarUrl',
      Cell: (props: any) => <img height='20' width='20' alt={props.value} src={props.value || defaultAvatar}/>,
      maxWidth: 32,
    },
    {
      Header: 'Author',
      accessor: 'commit.author.name',
      Cell: (props: any) => <span>{props.value}</span>,
      maxWidth: 100,
    }, {
      Header: 'Message',
      accessor: 'commit.message',
      minWidth: 200,
    }, {
      Header: 'Date',
      accessor: 'commit.author.date',

    }, {
      Header: 'Url',
      accessor: 'friendlyUrl',
      Cell: (props: any) => <a href={props.value} rel='noopener noreferrer' target='_blank' className='number'>{props.value}</a>
    }
  ]

  return <ReactTable
    data={data}
    columns={columns}
  />
}

export default Table