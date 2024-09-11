import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";


const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;


const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;



function CreateCabinForm() {
  const {register, handleSubmit, reset, getValues, formState} = useForm();
  const {errors} = formState
  console.log(errors);
  const queryClient = useQueryClient();
  const {mutate, isLoading: isCreating} = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New Cabin Successfully Created");
      queryClient.invalidateQueries({queryKey: ["cabins"]});
      reset();
    },
    onError: (err) => toast.error(err.message),
  })

  

  function onSubmit(data){
    mutate({...data, image: data.image[0]});
  }
  function onError(errors) {
    console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
      
      <Label htmlFor="name">Cabin Name</Label>
      <Input type="text" id="name" disabled={isCreating} {...register("name", {
          required: "This field is required",
        })} />
        <Error>{errors?.name?.message}</Error>
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
      <Label htmlFor="maxCapacity">Maximum Capacity</Label>
        <Input type="number" id="maxCapacity" disabled={isCreating} {...register("maxCapacity", {
          required: "This field is required",
          min: {
            value: 1,
            message: "Capacity should at least be 1"
          }
        })
          
        } />
        <Error>{errors?.maxCapacity?.message}</Error>
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
      <Label htmlFor="regularPrice">Regular Price</Label>
        <Input type="number" id="regularPrice" disabled={isCreating} {...register("regularPrice", {
          required: "This field is required",
          min: {
            value: 1,
            message: "Capacity should at least be 1"
          }
        })
          
        } />
        <Error>{errors?.regularPrice?.message}</Error>
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
      <Label htmlFor="discount">Discount</Label>
        <Input type="number" id="discount" disabled={isCreating} defaultValue={0} {...register("discount", {
          required: "This field is required",
          validate: (value) => value <= getValues().regularPrice || "Discount should be less than regular Price"
        })} />
        <Error>{errors?.discount?.message}</Error>
      </FormRow>

      <FormRow label="Description for Website" error={errors?.description?.message}>
      <Label htmlFor="description">Description for Website</Label>
        <Textarea type="number" id="description" disabled={isCreating} defaultValue="" {...register("description", {
          required: "This field is required",
        })} />
        <Error>{errors?.description?.message}</Error>
      </FormRow>

      <FormRow label="Cabin Photo">
      <Label htmlFor="image">Cabin Photo</Label>
        <FileInput id="image" accept="image/*"
        {...register("image", {
          required: "This field is required",
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
