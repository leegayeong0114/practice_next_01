export interface ResponseBoardListModel {
    total_records: number
    total_pages: number
    catogories: any[]
    board: Board
    notice_writes: any[]
    writes: Write[]
    total_count: number
    current_page: number
    prev_spt: number | null
    next_spt: number | null
}

export interface ResponseBoard extends Board {}

export interface Board {
    writes: any;
    bo_table: string
    gr_id: string
    bo_subject: string
    bo_mobile_subject: string
    bo_device: string
    bo_admin: string
    bo_list_level: number
    bo_read_level: number
    bo_write_level: number
    bo_reply_level: number
    bo_comment_level: number
    bo_upload_level: number
    bo_download_level: number
    bo_html_level: number
    bo_link_level: number
    bo_count_delete: number
    bo_count_modify: number
    bo_read_point: number
    bo_write_point: number
    bo_comment_point: number
    bo_download_point: number
    bo_use_category: number
    bo_category_list: string
}

export interface Comment {
    wr_id: number
    wr_parent: number
    wr_name: string
    mb_id: string
    mb_image_path: string
    mb_icon_path: string
    save_content: string
    wr_datetime: string
    wr_last: string
    wr_option: string
    wr_email: string
    wr_comment: number
    wr_comment_reply: string
    is_reply: boolean
    is_edit: boolean
    is_del: boolean
    is_secret: boolean
    is_secret_content: boolean
}

export interface Write {
    wr_subjectstring: string
    wr_content: string
    wr_name: string
    wr_password: string
    wr_email: string
    wr_homepage: string
    wr_link1: string
    wr_link2: string
    wr_option: string
    html: string
    mail: string
    secret: string
    ca_name: string
    notic: boolean
    parent_id: number
}