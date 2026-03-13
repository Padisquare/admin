import CustomButton from "../common/custom-button"
import CustomInput from "../common/custom-input"

export default function CreateUserForm() {
    return (
        <form className="space-y-4 mt-4">
            <CustomInput
                name="name"
                label="Name"
                placeholder="Enter name"
                type="text"
                required
            />
            <CustomInput
                name="email"
                label="Email"
                placeholder="Enter email"
                type="email"
                required
            />
            <CustomInput
                name="password"
                label="Password"
                placeholder="Enter password"
                type="password"
                required
            />
            <CustomButton
                type="button"
                label="Create User"
                className="w-full"
            />
        </form>
    )
}