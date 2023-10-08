from fastapi import APIRouter
import glob

router = APIRouter()


@router.get("/rules")
def listAll():
    default = "*.pkl"
    path_file = glob.glob(default)
    filenames = [file.split(".pkl")[0] for file in path_file]
    return {"data": filenames}
