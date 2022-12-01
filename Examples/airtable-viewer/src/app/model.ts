export interface Root {
  records: Record[]
}

export interface Record {
  id?: string
  //createdTime?: string
  fields: Fields
}

export interface Fields {
  Description: string
  AssignedTo: string
  Done?: boolean
}
