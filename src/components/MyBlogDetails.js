import { useBlogsContext } from "../hooks/useBlogsContext"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useNavigate } from "react-router-dom"


const MyBlogDetails = ({blog})=>{

    const {dispatch } = useBlogsContext()

    const navigate = useNavigate()

    const handleDelete = async ()=>{
        const response = await fetch('https://anmol-solr.onrender.com/api/blogs/'+blog._id , {
            method: 'DELETE'
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type:'DELETE_BLOG' , payload : json})
            window.location.reload()
        }
        
    }
    const handleEdit = async ()=>{
        
        navigate('/edit/'+blog._id)
    }

    return(
        <div className="blog-details">
            <img src={blog.image} alt={blog.title}  />
            <h4 onClick={()=>{navigate(`/blog/${blog._id}`)}}>{blog.title}</h4>
            <p><strong>Author :</strong> {blog.authorDetails.name}  </p>
            <p><strong>Email :</strong> {blog.authorDetails.email} </p>
            <br/>
            <p><strong>Description :</strong> {blog.description}</p>
            <br/>
            <p>{formatDistanceToNow(new Date(blog.createdAt) , {addSuffix :true} )}</p>
            <span  className="material-symbols-outlined blog-details-span-delete" onClick={handleDelete}>delete</span>
            <br/>
            <span  className="material-symbols-outlined blog-details-span-edit" onClick={()=>{handleEdit(blog._id)}}>edit</span>
        </div>
    )
}

export default MyBlogDetails